'use strict'

const mongoose = require('mongoose')

import {RefreshTokenModel} from '../models/refreshToken'
import {ArticleModel} from '../models/article'
import {UserModel} from '../models/user'
import {UserNewsModel} from '../models/userNews'
import {UserFavoritesModel} from '../models/userFavorites'

const deleteArticleById = async id => {
  const news = await UserNewsModel.findOneAndRemove({ _id: id }).exec()
  return news
}

const postArticle = async body => {
  const userArr = await UserModel.find({ name: body.username }).exec()
  const _user = userArr[0]
  const article:any = new ArticleModel({
    source: body.source,
    author: body.author,
    title: body.title,
    description: body.description,
    url: body.url,
    urlToImage: body.urlToImage,
    publishedAt: body.publishedAt,
    content: body.content,
    userId: _user._id
  })
  const news = new UserNewsModel({
    _id: new mongoose.Types.ObjectId(),
    news: [article],
    userId: article.userId
  })
  const _news = await news.save()
  return news
}

const findArticleByIdAndSaveToFav = async id => {
  const recordArr = await UserNewsModel.find({ _id: id }).exec()
  const _record:any = recordArr[0]
  const favorite = new UserFavoritesModel({
    _id: new mongoose.Types.ObjectId(),
    favorites: _record.news,
    userId: _record.userId
  })
  const _favorite = await favorite.save()
  return favorite
}

const removeFromFavorite = async id => {
  console.log({ id })
  const favorite = await UserFavoritesModel.findOneAndRemove({ _id: id }).exec()
  //const user = await User.findOne({ _id: article.userId })
  //TODO: removing from vavorited (array) - slice - indexOf - empty array
  console.log({ favorite })
  return favorite
}

const getAllFavorites = async userId => {
  const favorites = await UserFavoritesModel.find({ userId })
  return favorites
}

const findRefreshTokenByUserId = async id => {
  const refreshToken = await RefreshTokenModel.findOne({ refresh: id }).exec()
  return refreshToken
}

const deleteRefreshToken = async token => {
  const refreshToken = await RefreshTokenModel.findOneAndRemove({ payload: token }).exec()
  return refreshToken
}

const findRefreshTokenByPayload = async token => {
  const refreshToken = await RefreshTokenModel.findOne({ payload: token }).exec()
  return refreshToken
}

export default {
  findRefreshTokenByUserId,
  deleteRefreshToken,
  findRefreshTokenByPayload,
  deleteArticleById,
  findArticleByIdAndSaveToFav,
  postArticle,
  removeFromFavorite,
  getAllFavorites
}
