import { MISSING_AUTHORIZATION_TOKEN } from '../enums/Messages'

export const b64DecodeUnicode = (b64Encoded: string) => {
  return Buffer.from(b64Encoded, 'base64').toString()
}

export const b64EncodeUnicode = (text: string) => {
  return Buffer.from(text).toString('base64')
}

export const decodeBasicAuth = (token: string): { email: string; password: string } => {
  if (!token) {
    throw new Error(MISSING_AUTHORIZATION_TOKEN)
  }
  const authorization = token.split(' ')[1] || ''
  const [email, password] = b64DecodeUnicode(authorization).split(':')
  return { email, password }
}
