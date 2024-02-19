import CONFIG from './config'

import { logger } from '../helpers/logger'

import mongoose from 'mongoose'

/* Database Connect */
const ENCODED_PASS = encodeURIComponent(CONFIG.DB_PASSWORD)

const connectionStr =
  CONFIG.APP === 'local-dev'
    ? CONFIG.DB_HOST
    : `${CONFIG.DB_USER}:${ENCODED_PASS}@${CONFIG.DB_HOST}:${CONFIG.DB_PORT}/${CONFIG.DB_NAME}?authSource=admin`

mongoose
  .set('strictQuery', false)
  .connect(`mongodb://${connectionStr}`)
  .then(() => logger('connected to mongo db...'))
  .catch(err => logger('Could not connect to MongoDB...', err))

export default mongoose
