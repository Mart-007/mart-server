import * as dotenv from 'dotenv'
dotenv.config()

export default {
  APP: process.env.APP || 'development',
  NODE_ENV: process.env.NODE_ENV || '',
  PORT: process.env.PORT || '3001',

  AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY || '',

  DB_DIALECT: process.env.DB_DIALECT || 'mongo',
  DB_HOST: process.env.DB_HOST || '127.0.0.1:27017/mart-db',
  DB_PORT: process.env.DB_PORT || '27017',
  DB_NAME: process.env.DB_NAME || 'mart',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || ''
}
