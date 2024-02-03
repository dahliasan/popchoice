// This helped alot: https://stackoverflow.com/questions/69580704/nextjs-run-a-typescript-script-on-the-server

import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { openai, supabase } from '@/lib/config'
import { OpenAIEmbeddings } from '@langchain/openai'

async function getMovies() {
  try {
    const openAIApiKey = process.env.OPENAI_API_KEY
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

getMovies()
