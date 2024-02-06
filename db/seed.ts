// This helped alot: https://stackoverflow.com/questions/69580704/nextjs-run-a-typescript-script-on-the-server

import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { openai, supabase, tmdbOptions } from '@/lib/config'
import { OpenAIEmbeddings } from '@langchain/openai'
import { Document } from '@langchain/core/documents'

import * as fs from 'fs'

const { genres } = JSON.parse(fs.readFileSync('./db/genres.json', 'utf8'))
const openAIApiKey = process.env.OPENAI_API_KEY

console.log(genres)

async function getMovies() {
  try {
    const loader = new TextLoader('./db/movies.txt')
    const docs = await loader.load()
    const splitter = new RecursiveCharacterTextSplitter()
    const splitDocs = await splitter.splitDocuments(docs)
    await SupabaseVectorStore.fromDocuments(
      splitDocs,
      new OpenAIEmbeddings({ openAIApiKey }),
      {
        client: supabase,
        tableName: 'movies',
      }
    )

    console.log('done')
  } catch (e) {
    console.error(e)
  }
}

// getMovies()

async function getTopRatedMovies() {
  try {
    let allResults: Record<string, any>[] = []

    for (let page = 1; page <= 5; page++) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
        tmdbOptions
      )
      // const options = {
      //   method: 'GET',
      //   headers: {
      //     accept: 'application/json',
      //     Authorization:
      //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzRkZjllMTQ3MjE2MzU5ZjlmOWUzYzM0ZTVjZjI3NyIsInN1YiI6IjYyYjdhNmVkMmIxMTNkMDA1MTk3ZjY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KoXgowvy5i1B_MVZSjxr-mHRV1WuWt4sbXO7LETQgJs',
      //   },
      // }

      // fetch(
      //   'https://api.themoviedb.org/3/movie/popular?language=en-US&page=2',
      //   options
      // )
      //   .then((response) => response.json())
      //   .then((response) => console.log(response))
      //   .catch((err) => console.error(err))

      const data = await res.json()
      const { results } = data

      results.forEach((item: any) => {
        const genreNames = item.genre_ids.map((id: number) => {
          return genres.find(
            (genre: { id: number; name: string }) => genre.id === id
          ).name
        })

        item.genre_names = genreNames
      })

      allResults = allResults.concat(results)
    }

    const docs = allResults.map((movie: Record<string, any>) => {
      return new Document({
        pageContent: `${movie.title}: ${
          movie.release_date
        } | ${movie.genre_names.join(', ')} | ${movie.overview} `,
        metadata: {
          ...movie,
          type: 'top_rated',
        },
      })
    })

    console.log(docs)

    await SupabaseVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey }),
      {
        client: supabase,
        tableName: 'movies',
      }
    )

    return docs
  } catch (e) {
    console.error(e)
  }
}

getTopRatedMovies()
