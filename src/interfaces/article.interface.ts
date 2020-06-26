import { Document } from 'mongoose'

export interface Article extends Document {
  readonly _id: string,
  readonly source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  userId: String
}
