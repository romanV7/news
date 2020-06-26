'use strict'

import axios from 'axios'
import * as express from 'express'
import {ArticleModel} from '../models/article'
import Methods from '../shared/database'

const apiKey = process.env.API_KEY
const API_URL = process.env.API_URL

const saveAllArticles = (req: express.Request, res: express.Response) => {
  const url = `${API_URL}?country=us&apiKey=${apiKey}`
  axios.get(url).then(response => {
    const arr = response.data.articles

    for (let i = 0, { length } = arr; i < length; i++) {
      const articleRecord = new ArticleModel(arr[i])
      console.log({ articleRecord })
      articleRecord.save((err: any, elem) => {
        if (err) return res.status(404).json(err)
        console.log({ elem })
        /*client.setex(article._id, 60, JSON.stringify(article), (err, reply) => {
          if (err) console.log(err)
          console.log({ reply })
        })*/
      })
    }
    return res.status(201).json({ message: 'Articles has been saved' })
  }).catch(err => console.log(err))
}

const getAllArticles = async (req: express.Request, res: express.Response) => {
  try {
    const articles = await ArticleModel.find()
    return res.status(200).json(articles)
  } catch(err) { return res.status(500).json({ error: err }) }
}

const postNews = async (req, res) => {
  try {
    const news = await Methods.postArticle(req.body)
    return res.status(200).json({
      message: 'News was saved',
      id: news._id
    })
  } catch(err) { return res.status(500).json({ error: err }) }
}

const removeNews = async (req: express.Request, res: express.Response) => {
  const article = await Methods.deleteArticleById(req.params.id)
  return res.sendStatus(204)
}

const saveFavorite = async (req: express.Request, res: express.Response) => {
  // redis caching ? probaly not - only when get data ?
  const favorite = await Methods.findArticleByIdAndSaveToFav(req.body.id)
  res.status(200).json({
    message: 'Article was added to favorites',
    id: favorite._id
  })
}

const removeFavorite = async (req: express.Request, res: express.Response) => {
  const article = await Methods.removeFromFavorite(req.params.id)
  return res.status(204).json({ message: 'Article was removed from favorites' })
}

const getAllFavorites = async (req: express.Request, res: express.Response) => {
  const favorites = await Methods.getAllFavorites(req.params.userId)
  return res.status(204).json(favorites)
}
// TODO:
const getFavorites = async (req: express.Request, res: express.Response) => {}

export default {
  getFavorites,
  getAllFavorites,
  removeFavorite,
  saveFavorite,
  removeNews,
  postNews,
  getAllArticles,
  saveAllArticles
}
