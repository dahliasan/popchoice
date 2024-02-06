import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'

/** OpenAI config */
if (!process.env.OPENAI_API_KEY)
  throw new Error('OpenAI API key is missing or invalid.')
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

/** Supabase config */
const privateKey = process.env.SUPABASE_API_KEY
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`)
const url = process.env.SUPABASE_URL
if (!url) throw new Error(`Expected env var SUPABASE_URL`)
export const supabase = createClient(url, privateKey)

/** Langchain config */
const embeddings = new OpenAIEmbeddings({
  configuration: {
    baseURL: 'https://oai.hconeai.com/v1',
    defaultHeaders: {
      'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
    },
  },
})
export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: 'movies',
  queryName: 'match_movies',
})

export const retriever = vectorStore.asRetriever({
  searchType: 'mmr',
  searchKwargs: {
    fetchK: 5,
  },
})

export const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,

  configuration: {
    baseURL: 'https://oai.hconeai.com/v1',
    defaultHeaders: {
      'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
    },
  },
})

export const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN_AUTH}`,
  },
}
