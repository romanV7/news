'use strict'

import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const articleSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  source: {
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const ArticleModel = mongoose.model('Article', articleSchema)

export { ArticleModel }
