import { NextRequest } from 'next/server'
import { retriever, llm, supabase } from '@/lib/config'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { combineDocs } from '@/lib/combineDocs'
import {
  MovieResult,
  movieCompletionJSONOutputSchema,
  MovieMetadata,
} from '@/types/types'

export const runtime = 'edge'

const answerTemplate = `You are a friendly and expert movie recommender. Based on the user's response to a quiz and a filtered list of the most relevant movies, you will recommend the top 3 movies that the user or the group of users should watch. You will also provide a short, friendly and slightly humorous explanation in 1 sentence why the user(s) would enjoy each movie.

{format_instructions}

If none of the movies are suitable, return an empty array.

User(s) quiz response (each person separated by /n/n): {input}

Most relevant movies sorted from highest to lowest: {movies_context}

JSON OUTPUT:`

const parser = StructuredOutputParser.fromZodSchema(
  movieCompletionJSONOutputSchema
)

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

export async function POST(req: NextRequest) {
  const { prompt: input } = await req.json()

  const { docs: relevantDocs, docsAsString } = await combineDocs(input)
  const chain = RunnableSequence.from([answerPrompt, llm, parser])
  const response = await chain.invoke({
    input,
    movies_context: docsAsString,
    format_instructions: parser.getFormatInstructions(),
  })

  console.log('✅', response)

  // https://image.tmdb.org/t/p/w500${data.results[0].poster_path}

  const movieResults: MovieResult[] = []

  for (const movie of response) {
    const { title, reason } = movie

    // find the movie from relevantDocs
    const foundMovie = relevantDocs.find((doc) => doc.metadata.title === title)

    if (!foundMovie) {
      console.error('Movie not found in relevantDocs', title)
      continue
    }

    const { metadata } = foundMovie
    const { poster_path, release_date } = metadata

    const posterUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : undefined

    const movieResult: MovieResult = {
      title,
      releaseYear: release_date,
      posterUrl,
      reason,
    }

    movieResults.push(movieResult)
  }

  return Response.json(movieResults)
}
