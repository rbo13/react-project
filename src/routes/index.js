import express from 'express'
// import { getHelloWorldRoutes } from './hello'
import { getAccountRoutes } from './account'

function getRoutes() {
  const router = express.Router()
  // router.use('/hello', getHelloWorldRoutes())
  router.use('/accounts', getAccountRoutes())
  return router
}

export { getRoutes }
