const express = require('express')
const db = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/posts')
})

router.get('/posts', async (req, res) => {
  const posts = await db.getDb().collection('posts').find().toArray()
  res.render('posts-list', { posts: posts })
})

router.get('/new-post', async (req, res) => {
  const authors = await db.getDb().collection('authors').find().toArray()

  res.render('create-post', { authors: authors })
})

router.post('/new-post', async (req, res) => {
  const authorId = (req.body.author).trim()
  const Obj_id = new ObjectId(authorId)
  const author = await db.getDb().collection('authors').findOne({ _id: Obj_id })

  try {
    const newPost = {
      title: req.body.title,
      summary: req.body.summary,
      body: req.body.content,
      date: new Date(),
      author: {
        id: authorId,
        name: author.name,
        email: author.email
      }
    }
    const result = await db.getDb().collection('posts').insertOne(newPost)
  } catch (err) {
    console.log(err)
  } finally {
    res.redirect('/posts')
  }
})

router.get('/detailPost/:id', async (req, res) => {
  let post
  try {
    const postId = (req.params.id).trim()
    const post_id = new ObjectId(postId)
    post = await db.getDb().collection('posts').findOne({ _id: post_id })
  } catch {

  }

  if (!post) {
    return res.status(404).render('404')
  }

  res.render('post-detail', {
    post: post
  })
})

router.get('/updatePost/:id', async (req, res) => {
  let post
  try {
    const postId = (req.params.id).trim()
    const post_id = new ObjectId(postId)
    post = await db.getDb().collection('posts').findOne({ _id: post_id })
  } catch { }

  if (!post) {
    return res.status(404).render('404')
  }

  res.render('update-post', {
    post: post
  })
})

router.post('/updatePost/:id', async (req, res) => {
  const updatedPost = {
    $set: {
      title: req.body.title,
      summary: req.body.summary,
      body: req.body.content
    }
  }
  let post
  try {
    const postId = (req.params.id).trim()
    const post_id = new ObjectId(postId)
    post = await db.getDb().collection('posts').updateOne({ _id: post_id }, updatedPost, null)
  } catch (err) { console.log(err) }

  res.redirect('/posts')
})

router.get('/posts/:id/comments', async (req, res) => {
  const postId = (req.params.id).trim()
  const comments = await db.getDb()
    .collection('comments')
    .find({ postId: postId }).toArray()

  res.json(comments)
})

router.post('/posts/:id/comments', async (req, res) => {
  const postId = (req.params.id).trim()
  const newComment = {
    postId: postId,
    title: req.body.title,
    text: req.body.text
  }
  await db.getDb()
    .collection('comments')
    .insertOne(newComment)
})

module.exports = router