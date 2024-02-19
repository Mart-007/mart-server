import { StatusCode } from '../enums/Http'
import { INVALID_REQUEST_FIELD } from '../enums/Messages'
import { logger } from '../helpers/logger'
import TestPostSvc from '../impl/TestPostSvc'
import { ITestPost } from '../interface/TestPost'
import { validateTestPost } from '../validations/TestPost'

import { Request, Response } from 'express'

class TestPost {
  public static create = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, age }: ITestPost = req.body

    const { error: schemaErr } = validateTestPost(req.body)

    const result = await TestPostSvc.create({ firstName, lastName, age })

    if (schemaErr) {
      logger('Test Post Failed', {
        message: INVALID_REQUEST_FIELD,
        err: schemaErr.details
      })

      res.status(StatusCode.BAD_REQUEST).json({
        success: false,
        message: INVALID_REQUEST_FIELD,
        errors: schemaErr.details
      })
    }

    res.status(result.statusCode).json(result.body)
    logger('create test post success', { firstName, lastName, age })
  }
}

export default TestPost
