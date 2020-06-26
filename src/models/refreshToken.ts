'use strict'

import * as mongoose from 'mongoose'

const refreshTokenSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  refresh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  payload: {
    type: String,
    required: false
  }
})

const RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema)

export { RefreshTokenModel }
