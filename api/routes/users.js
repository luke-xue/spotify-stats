var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var auth = require('./spotify')
var dotenv = require('dotenv').config()

router.get('/likedsongs', async (req, res, next) => {
  try{
      const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=15'
      const data = await fetch(url, {headers: {
          'Authorization': 'Bearer ' + req.query.token
      }}).catch(err=> console.log(err))
          .then(res=> res.json())
          .then(data => data)
      return res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      return res.status(500).json(err)
  }
})

router.get('/toptracks/short', async (req, res, next) => {
  try{
      const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=15&time_range=short_term'
      const data = await fetch(url, {headers: {
          'Authorization': 'Bearer ' + req.query.token
      }}).catch(err=> console.log(err))
          .then(res=> res.json())
          .then(data => data)
      return res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      return res.status(500).json(err)
  }
})

router.get('/toptracks/medium', async (req, res, next) => {
  try{
      const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=15'
      const data = await fetch(url, {headers: {
          'Authorization': 'Bearer ' + req.query.token
      }}).catch(err=> console.log(err))
          .then(res=> res.json())
          .then(data => data)
      return res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      return res.status(500).json(err)
  }
})

router.get('/toptracks/long', async (req, res, next) => {
  try{
      const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=15&time_range=long_term'
      const data = await fetch(url, {headers: {
          'Authorization': 'Bearer ' + req.query.token
      }}).catch(err=> console.log(err))
          .then(res=> res.json())
          .then(data => data)
      return res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      return res.status(500).json(err)
  }
})

router.get('/topartists/short', async (req, res, next) => {
  try{
      const url = 'https://api.spotify.com/v1/me/top/artists?offset=0&limit=15&time_range=short_term'
      const data = await fetch(url, {headers: {
          'Authorization': 'Bearer ' + req.query.token
      }}).catch(err=> console.log(err))
          .then(res=> res.json())
          .then(data => data)
      return res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      return res.status(500).json(err)
  }
})

router.get('/topartists/medium', async (req, res, next) => {
  try{
      const url = 'https://api.spotify.com/v1/me/top/artists?offset=0&limit=15'
      const data = await fetch(url, {headers: {
          'Authorization': 'Bearer ' + req.query.token
      }}).catch(err=> console.log(err))
          .then(res=> res.json())
          .then(data => data)
      return res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      return res.status(500).json(err)
  }
})

router.get('/topartists/long', async (req, res, next) => {
  try{
      const url = 'https://api.spotify.com/v1/me/top/artists?offset=0&limit=15&time_range=long_term'
      const data = await fetch(url, {headers: {
          'Authorization': 'Bearer ' + req.query.token
      }}).catch(err=> console.log(err))
          .then(res=> res.json())
          .then(data => data)
      return res.status(200).json(data)
  }
  catch(err){
      console.log(err)
      return res.status(500).json(err)
  }
})

module.exports = router;
