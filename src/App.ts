import ApiMiddleware from './middleware/Api'
import { api } from './routes/index'

import cors from 'cors'
import express, { Application } from 'express'

function createServer() {
  const app: Application = express()

  app.use(cors())
  app.use(ApiMiddleware.requestId)
  app.use(ApiMiddleware.logHelper)
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use('/health-check', (_req, res) => res.status(200).send('OK!'))

  // ignore favicon ico requests by returning 204 response
  app.use('/favicon.ico', (_req, res) => res.status(204).end())

  app.use(ApiMiddleware.logIncomingRequest)

  // create/update routes
  app.use('/', api)

  // invalid route middleware
  app.use('*', ApiMiddleware.notFound)

  /**
   * Unhandled error middleware
   * - must be last to catch all possible unhandled errors
   */
  app.use(ApiMiddleware.error)

  return app
}

export default createServer
