import CONFIG from '../config/config'
import { MISSING_AUTHORIZATION_TOKEN } from '../enums/Messages'

import { NextFunction, Request, Response } from 'express'

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers?.authorization

  const clientToken = CONFIG.AUTHORIZATION_KEY

  if (token !== clientToken) {
    req.log.error('Invalid auth token', MISSING_AUTHORIZATION_TOKEN)
    res.status(401).send({ success: false, message: MISSING_AUTHORIZATION_TOKEN })
    return
  }

  next()
}

export default verifyToken
