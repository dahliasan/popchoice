import { NextRequest } from 'next/server'
import { retriever, llm } from '@/lib/config'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { combineDocs } from '@/lib/combineDocs'

export const runtime = 'edge'

const answerTemplate = `You are a friendly and expert movie recommender. Based on the user's response to a quiz and a filtered list of the most relevant movies, you will recommend the top 3 movies that the user should watch. You will also provide a short explanation in 1 sentence why the user would enjoy each movie.

{format_instructions}

If none of the movies are suitable, return an empty array.

User quiz response: {input}

Most relevant movies: {movies_context}

JSON OUTPUT:`

const parser = StructuredOutputParser.fromZodSchema(
  z.array(
    z.object({
      title: z.string().describe('The title of the movie'),
      reason: z
        .string()
        .describe('A short explanation why the user would enjoy the movie'),
      releaseYear: z.string().describe('The release year of the movie'),
      poster: z.string().optional().describe('Ignore this field for now.'),
    })
  )
)

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

export async function POST(req: NextRequest) {
  const { prompt: input } = await req.json()

  const movies_context = await combineDocs(input)
  const chain = RunnableSequence.from([answerPrompt, llm, parser])
  const response = await chain.invoke({
    input,
    movies_context,
    format_instructions: parser.getFormatInstructions(),
  })

  console.log('✅', response)

  //  Get movie poster
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN_AUTH}`,
    },
  }

  const updatedResponse = await Promise.all(
    response.map(async (movie) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${movie.title}&include_adult=false&language=en-US&primary_release_year=${movie.releaseYear}&page=1`,
          options
        )

        const data = await res.json()

        if (data.results.length > 0) {
          movie.poster = `https://image.tmdb.org/t/p/w300${data.results[0].poster_path}`
        }

        return movie
      } catch (error) {
        console.log('🚨')
        console.error(error)
        return movie
      }
    })
  )

  return Response.json(updatedResponse)
}
