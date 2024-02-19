import crypto from 'crypto'

export const hmacSha256EncodeUnicode = (message: string, key: string) => {
  return crypto.createHmac('sha256', key).update(message).digest('hex')
}
