import { formatDocumentsAsString } from 'langchain/util/document'
import { retriever } from './config'
import { MovieMetadata } from '@/types/types'

export const combineDocs = async (input: string) => {
  const relevantDocs = await retriever.getRelevantDocuments(input)
  return {
    docs: relevantDocs as { pageContent: string; metadata: MovieMetadata }[],
    docsAsString: formatDocumentsAsString(relevantDocs),
  }
}
