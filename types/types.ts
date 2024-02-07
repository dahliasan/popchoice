import { z } from 'zod'

export type TextFieldType = BaseFieldType & {
  type: 'text' | 'textarea'
  placeholder?: string
}

export type RadioFieldType = BaseFieldType & {
  type: 'radio'
  options: { label: string; value: string }[]
}

export type BaseFieldType = {
  id: string
  label: string
}

export type Field = TextFieldType | RadioFieldType

export const movieCompletionJSONOutputSchema = z.array(
  z.object({
    title: z.string().describe('The exact title of the movie'),
    reason: z
      .string()
      .describe(
        'A short, slightly humorous, and friendly explanation why the user or group of users would enjoy the movie'
      ),
  })
)

export const movieResultSchema = z.object({
  title: z.string(),
  releaseYear: z.string(),
  posterUrl: z.string().optional(),
  reason: z.string(),
})

export type MovieResult = z.infer<typeof movieResultSchema> &
  z.infer<typeof movieMetadataSchema>

//  {
//       "adult": false,
//       "backdrop_path": "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
//       "genre_ids": [18, 80],
//       "id": 278,
//       "original_language": "en",
//       "original_title": "The Shawshank Redemption",
//       "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
//       "popularity": 120.472,
//       "poster_path": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
//       "release_date": "1994-09-23",
//       "title": "The Shawshank Redemption",
//       "video": false,
//       "vote_average": 8.712,
//       "vote_count": 25487
//     },

const movieMetadataSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  genre_names: z.array(z.string()).optional(),
  type: z.string().optional(),
})

export type MovieMetadata = z.infer<typeof movieMetadataSchema>
