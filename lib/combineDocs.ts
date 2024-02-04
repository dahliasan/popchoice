import { formatDocumentsAsString } from 'langchain/util/document'
import { retriever } from './config'

export const combineDocs = async (input: string) => {
  const relevantDocs = await retriever.getRelevantDocuments(input)
  return formatDocumentsAsString(relevantDocs)
}
