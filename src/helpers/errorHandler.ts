import { Response } from 'express'

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
