'use strict'

import * as mongoose from 'mongoose'

const userFavoritesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  favorites: {
    type: Array,
    default: []
  },
  userId: {
    type: String,
    required: true
  }
})

const UserFavoritesModel = mongoose.model('UserFavorites', userFavoritesSchema)

export { UserFavoritesModel }
