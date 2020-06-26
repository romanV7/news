'use strict'

import * as mongoose from 'mongoose'

const userNewsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  news: {
    type: Array,
    default: []
  },
  userId: {
    type: String,
    required: true
  }
})

const UserNewsModel = mongoose.model('UserNews', userNewsSchema)

export { UserNewsModel }
