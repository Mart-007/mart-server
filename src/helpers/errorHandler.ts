import { logger } from './logger'
import { delay } from './pureFunctions'

import { RETRY_STATUS_CODES } from '../enums/AppConstants'
import { GRAB_RETRY_MESSAGE, GRAB_RATE_LIMIT_MESSAGE } from '../enums/Messages'

import { Response } from 'express'

export const grabRetryHandler = (fnName: string, promise: Promise<any>): Promise<any> => {
  return promise.catch(async err => {
    const errRes = err?.response?.data
    const errMsg = err?.response?.data?.error_description || err?.response?.data?.message || ''
    const statusCode = err?.response?.status || ''
    if (
      (!errMsg.includes(GRAB_RETRY_MESSAGE) || !errMsg.includes(GRAB_RATE_LIMIT_MESSAGE)) &&
      !RETRY_STATUS_CODES.includes(statusCode)
    ) {
      throw err
    }
    await delay(2000)
    logger(`Grab Retry ${fnName}`, { ...errRes })
    return promise.catch(retryErr => {
      const retryErrRes = retryErr?.response?.data
      logger(`Grab Retry FAILED ${fnName}`, { ...retryErrRes })
      throw retryErr
    })
  })
}

export const catchCallback = (err: any, res: Response) => {
  const error = err.message || err
  const message = error?.failed?.message || error.message
  const status = err instanceof ReferenceError ? 400 : 500
  res.status(status)
  res.send({
    success: false,
    message: message || error
  })
  return error
}
