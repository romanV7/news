'use strict'

require('dotenv').config()

import * as express from 'express'

import UserController from './controllers/user'
import RenderController from './controllers/render'
import ArticleController from './controllers/article'
import Middleware from './middleware/authentication'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')

app.post('/register', UserController.register)
app.post('/login', UserController.login)
app.delete('/logout', UserController.logout)
app.get('/register', RenderController.register)
app.get('/login', RenderController.login)
app.post('/token', UserController.token)

app.get('/saveArticles'/*, Middleware.authenticateToken*/, ArticleController.saveAllArticles)
app.get('/getArticles'/*, Middleware.authenticateToken*/, ArticleController.getAllArticles)
app.post('/feed', /*Middleware.authenticateToken,*/ ArticleController.postNews)
app.delete('/feed/:id', /*Middleware.authenticateToken,*/ ArticleController.removeNews)
app.post('/favorites/save', /*Middleware.authenticateToken,*/ ArticleController.saveFavorite)
app.delete('/favorites/:id', /*Middleware.authenticateToken,*/ ArticleController.removeFavorite)
app.get('/favorites/:userId', /*Middleware.authenticateToken,*/ ArticleController.getAllFavorites)

// TODO:
//app.get('/favorites/:id', /*Middleware.authenticateToken,*/ ArticleController.getFavorite)

//export { app }

export { app }
