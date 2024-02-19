import { validate } from './Common'

import { ITestPost } from '../interface/TestPost'

import Joi from 'joi'

export const validateTestPost = (data: unknown) =>
  validate({
    data,
    schema: Joi.object<ITestPost>()
      .keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().required()
      })
      .required()
  })
