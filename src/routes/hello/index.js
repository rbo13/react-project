import express from 'express'

function getHelloWorldRoutes() {
  const router = express.Router()
  router.get('/greet', greet)
  return router
}

async function greet(req, res) {
  const message = req.query.message
  return res.status(200).send(`Hello, ${message}`)
}

export { getHelloWorldRoutes }