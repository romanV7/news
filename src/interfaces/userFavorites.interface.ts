import { Document } from 'mongoose'

export interface UserFavorites extends Document {
  readonly _id: string
  readonly userId: string
  favorites: string[]
}
