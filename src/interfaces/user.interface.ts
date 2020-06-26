import { Document } from 'mongoose'

export interface User extends Document {
  readonly _id: string
  name: string
  readonly email: string
  password: string
  news: string
  favorites: string
}
