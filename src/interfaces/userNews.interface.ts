import { Document } from 'mongoose'

export interface UserNews extends Document {
  readonly _id: string
  readonly userId: string
  news: string[]
}
