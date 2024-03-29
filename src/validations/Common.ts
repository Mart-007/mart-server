import Joi from 'joi'

const defaultOptions = {
  abortEarly: false,
  stripUnknown: true
}

export const validateAsync = <T = unknown>({
  data,
  schema,
  options
}: {
  schema: Joi.AnySchema<T>
  data: unknown
  options?: Joi.AsyncValidationOptions
}) => {
  return schema.validateAsync(data, {
    ...defaultOptions,
    ...(options || {})
  }) as Promise<T>
}

export const validate = <T = unknown>({
  data,
  schema,
  options
}: {
  schema: Joi.AnySchema<T>
  data: unknown
  options?: Joi.AsyncValidationOptions
}) => {
  return schema.validate(data, {
    ...defaultOptions,
    ...(options || {})
  })
}
