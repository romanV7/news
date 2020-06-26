import { Document } from 'mongoose'

export interface RefreshToken extends Document {
  readonly _id: string
  refresh: string
  payload: string
}
