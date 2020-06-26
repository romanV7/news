'use strict'

import * as express from 'express'
const register = (req: express.Request, res: express.Response) => res.render('register.ejs')
const login = (req: express.Request, res: express.Response) => res.render('login.ejs')
const makePost = (req: express.Request, res: express.Response) => res.render('post.ejs')

export default { register, login, makePost }
