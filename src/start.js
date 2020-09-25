import express from 'express'
import 'express-async-errors'
import logger from 'loglevel'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import historyApiFallback from 'connect-history-api-fallback'
dotenv.config('../.env')

import { getRoutes } from './routes'

function startServer({ PORT = process.env.PORT } = {}) {
  const app = express()

  setupMiddlewares(app)
  
  // api routes
  app.use('/api', getRoutes())

  app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });

  // support history API for fallback route
  app.use(historyApiFallback({
    index: '../client/build/index.html',
    disableDotRule: true,
    verbose: true
  }))
  // errorMiddleware
  app.use(errorMiddleware)

  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      logger.info(`Listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose)
        })
      }
      setupCloseOnExit(server)
      resolve(server)
    })
  })
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
}

function setupMiddlewares(app) {
  app.use(morgan('dev'))
  app.use(helmet.hidePoweredBy())
  app.use(express.json({ limit: "50mb" })) // accepts JSON body requests.
  const staticAssets = path.join(__dirname, '../client/build')
  app.use(express.static(staticAssets))
  return app
}

function setupCloseOnExit(server) {
  // https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed')
      })
      .catch((e) => {
        logger.warn('Something went wrong closing the server', e.stack)
      })
    // eslint-disable-next-line no-process-exit
    if (options.exit) process.exit()
  }

  // do something when app is closing
  process.on('exit', exitHandler)

  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit: true}))

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, {exit: true}))
  process.on('SIGUSR2', exitHandler.bind(null, {exit: true}))

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {exit: true}))
}

export { startServer }
