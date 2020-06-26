'use strict'

require('dotenv').config()

import * as mongoose from 'mongoose'
import * as express from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import {UserModel} from '../models/user'
import {RefreshTokenModel} from '../models/refreshToken'

import GenerateToken from '../shared/generateToken'
import Methods from '../shared/database'
import { UserDto } from '../dto/user.dto'

const register = async (req: express.Request, res: express.Response) => {
  const userByEmail = await UserModel.find({ email: req.body.email }).exec()
  const userByName = await UserModel.find({ name: req.body.name }).exec()
  if (userByEmail.length >= 1) return res.status(409).json({ message: 'Mail exsists' })
  if (userByName.length >= 1) return res.status(409).json({ message: 'Name exsists' })
  bcrypt.hash(req.body.password, +process.env.IV, async (err, hash) => {
    if (err) return res.status(500).json({ error: err })
    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    try {
      await user.save()
      res.render('login.ejs')
    } catch(err) { res.status(500).json({ error: err }) }
  })
}

const login = async (req: express.Request, res: express.Response) => {
  const user: any = await UserModel.find({ name: req.body.name }).exec()
    if (user.length < 1) return res.status(401).json({ message: 'Auth failed' })
    const { password, email, _id } = user[0]
    bcrypt.compare(req.body.password, password, async (err, result) => {
      if (err) return res.status(401).json({ message: 'Auth failed' })
      if (result) {
        const userData = { email: email, userId: _id }
        const accessToken = GenerateToken.generateAccessToken(userData)
        const refreshTokenPayload = GenerateToken.generateRefreshToken(userData)
        const refreshTokenCached = await Methods.findRefreshTokenByUserId(_id)
        if (refreshTokenCached) console.log('RefreshToken still exists')
        else {
          const refresh = new RefreshTokenModel({
            _id: new mongoose.Types.ObjectId(),
            refresh: _id,
            payload: refreshTokenPayload
          })
          try {
            await refresh.save()
          } catch(err) { res.status(500).json({ error: err }) }
        }
        return res.status(200).json({
          message: 'Auth successfull',
          accessToken,
          refreshTokenPayload,
          userId: _id
        })
      }
      res.status(401).json({ message: 'Auth failed' })
    })
}

const logout = async (req: express.Request, res: express.Response) => {
  await Methods.deleteRefreshToken(req.body.token)
  return res.sendStatus(204)
}

const token = async (req: express.Request, res: express.Response) => {
  const refreshTokenPayload = req.body.token
  const refreshToken = await Methods.findRefreshTokenByPayload(refreshTokenPayload)
  if (!refreshTokenPayload) return res.sendStatus(401)
  if (!refreshToken) return res.sendStatus(403)
  jwt.verify(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET, (err: any, user: UserDto) => {
    if (err) return res.sendStatus(403)
    const accessToken = GenerateToken.generateAccessToken({ name: user.name })
    res.json({ accessToken })
  })
}

export default { token, logout, register, login }
