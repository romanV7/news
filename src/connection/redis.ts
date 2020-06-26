'use strict'

const redis = require('redis')

const REDIS_URL = process.env.REDIS_URL

const redisConnect = () => {
  return new Promise((resolve, reject) => {
    const client = redis.createClient(REDIS_URL)
    client.on('connect', () => {
      console.log(`connected to redis`)
      resolve()
    })
    client.on('error', err => {
      console.log(`Error: ${err}`)
      reject(err)
    })
  })
}

//const getClient = () => client

export default { redisConnect }
