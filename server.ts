'use strict'

require('dotenv').config()
import * as http from 'http'
import {app} from './src/app'
import MongoConnect from './src/connection/mongo'
import RedisConnect from './src/connection/redis'

console.log({ MongoConnect, RedisConnect })

console.log({ mongo: MongoConnect.mongoConnect, redis: RedisConnect.redisConnect })

const PORT = process.env.SERVER_PORT || 3000
const server = http.createServer(app)
server.listen(PORT)
server.on('listening', () => console.log('server up and running'))

MongoConnect.mongoConnect().then(
  () => RedisConnect.redisConnect().then(
    () => server.listen(PORT,
      () => console.log(`Server listening on port ${PORT}`))
    )
 )
