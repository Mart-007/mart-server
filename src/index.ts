import './config/db'
import createServer from './App'
import CONFIG from './config/config'
import { logger } from './helpers/logger'

import moment from 'moment-timezone'

import fs from 'fs'
import https from 'https'

moment.tz.setDefault('Asia/Manila')

const PORT = CONFIG.PORT
const APP = CONFIG.APP

const app = createServer()

if (CONFIG.APP === 'beta') {
  const server = {
    cert: fs.readFileSync('/app/fullchain.pem'),
    key: fs.readFileSync('/app/privkey.pem')
  }

  https.createServer(server, app).listen(PORT, () => {
    logger(`Listening on port ${PORT}. APP: ${APP}`)
  })
} else {
  app.listen(PORT, () => {
    logger(`Listening on port ${PORT}. APP: ${APP}`)
  })
}
