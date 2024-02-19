import { logger } from '../helpers/logger'

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import { randomUUID } from 'crypto'

class ApiMiddleware {
  static notFound(_: Request, res: Response): void {
    res.status(httpStatus.NOT_FOUND)
    res.send({ message: 'Requested Resource Not Found' })
    res.end()
  }

  // err, req, res and next must be present to act as an error middleware
  static error(err: ErrorRequestHandler, req: Request, res: Response, _next: NextFunction): void {
    req.log.error(
      'Unhandled Error',
      {
        path: req.path,
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers
      },
      err
    )

    res.status(httpStatus.INTERNAL_SERVER_ERROR)
    res.send({ requestId: req.requestId, message: 'Internal Server Error' })
    res.end()
  }

  static requestId(req: Request, _: Response, next: NextFunction): void {
    req.requestId = randomUUID()
    next()
  }

  static logIncomingRequest(req: Request, _: Response, next: NextFunction): void {
    const endpoint = `${req?.method} ${req?.originalUrl}`
    req.log.info(
      'Incoming Request',
      JSON.stringify({
        endpoint,
        body: req.body,
        query: req.query,
        params: req.params
      })
    )
    next()
  }

  static logHelper(req: Request, _res: Response, next: NextFunction): void {
    const { requestId } = req
    req.log = {
      info: (label: string, ...args: unknown[]) => logger(`[info] [${requestId}]`, label, ...args),
      warn: (label: string, ...args: unknown[]) => logger(`[warn] [${requestId}]`, label, ...args),
      error: (label: string, ...args: unknown[]) => logger(`[error] [${requestId}]`, label, ...args)
    }
    next()
  }
}

export default ApiMiddleware
