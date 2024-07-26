import express from 'express'
import jsonServer from 'json-server'
import auth from 'json-server-auth'

import path from 'path'
import cors from 'cors'

const port = process.env.PORT || 3000

const app = jsonServer.create()
const router = jsonServer.router('db.json')
const rules = auth.rewriter({
  '/api/posts*': '/660/api/posts$1',
  '/api/users*': '/000/api/users$1',
  '/api/bookmarks*': '/600/api/bookmarks$1'
})

app.db = router.db

app.use(cors())
app.use(express.static(path.resolve('build')))

app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use(rules)
app.use(auth)
app.use('/api', router)

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
