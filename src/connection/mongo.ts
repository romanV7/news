'use strict'

process.env.NODE_ENV === 'test'
import * as mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

const MONGO_URI = process.env.MONGO_URI

const mongoConnect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose
      const mockgoose = new Mockgoose(mongoose)
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => {
              console.log('connected')
            }).catch(err => console.log(err))
        })
    } else {
      mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
          console.log('connected to mongo')
        }).catch(err => console.log(err))
      }
    })
}

export default { mongoConnect }
