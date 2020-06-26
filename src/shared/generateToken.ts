'use strict'

require('dotenv').config()
import * as jwt from 'jsonwebtoken'

const generateAccessToken = user =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.EXPIRES_IN })


const generateRefreshToken = user =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

export default { generateAccessToken, generateRefreshToken }
