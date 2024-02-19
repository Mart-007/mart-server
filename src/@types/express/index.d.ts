import { logger } from '../../helpers/logger'

declare global {
  namespace Express {
    export interface Request {
      log: {
        info: typeof logger
        warn: typeof logger
        error: typeof logger
      }
      requestId: string
    }
  }
}
