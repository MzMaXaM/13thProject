const express = require('express')
const mongodb = require('mongodb')
const db = require('../data/database')
const objectify = mongodb.ObjectId
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/posts')
})

router.get('/posts', (req, res) => {
  res.render('posts-list')
})

router.get('/new-post', async (req, res) => {
  const authors = await db.getDb().collection('authors').find().toArray()

  res.render('create-post', { authors: authors })
})

router.post('/new-post', async (req, res) => {
  const authorId = req.body.author
  const author = await db.getDb()
    .collection('authors')
    .findOne({ _id: authorId })

  console.log(author)

try{ 
  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name
    }
  }


  const result = await db.getDb()
  .collection('posts')
  .insertOne(newPost)

  console.log(result)
}catch(err){
  console.log(err)
}finally{
  res.redirect('/posts')
}
})

module.exports = router