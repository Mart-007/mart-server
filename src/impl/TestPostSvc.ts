import TestPostDAO from '../dao/TestPostDao'
import { StatusCode } from '../enums/Http'
import { errorApiResponse, successApiResponse } from '../helpers/api'
import { logger } from '../helpers/logger'
import { ITestPost } from '../interface/TestPost'

class TestPostSvc {
  static async create(payload: ITestPost) {
    let result: unknown

    try {
      result = await TestPostDAO.create(payload)
    } catch (err) {
      logger('Create test post err', payload, err)
      return errorApiResponse({
        body: { ...payload, message: err.message }
      })
    }

    return successApiResponse({
      statusCode: StatusCode.CREATED,
      body: result
    })
  }
}

export default TestPostSvc
