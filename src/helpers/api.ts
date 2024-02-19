import { StatusCode } from '../enums/Http'

interface ApiResponseParams<T> {
  statusCode: StatusCode
  body?: T
}

const makeResponse = <T>({ body, statusCode }: Partial<ApiResponseParams<T>>) => ({
  statusCode: statusCode || StatusCode.SERVER_ERROR,
  body
})

export const successApiResponse = <T>(params?: Partial<ApiResponseParams<T>>) =>
  makeResponse({ statusCode: StatusCode.SUCCESS, ...params })

export const errorApiResponse = <T>(params?: Partial<ApiResponseParams<T>>) =>
  makeResponse({ statusCode: StatusCode.SERVER_ERROR, ...params })
