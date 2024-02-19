/* eslint-disable no-console */
import moment from 'moment-timezone'

import { inspect } from 'util'

export const getTimestamp = () => moment().format()
export const getUnixTimestamp = () => moment().valueOf()

export const logger = (logLabel: string, ...args: unknown[]) => {
  return console.log(
    `[${getTimestamp()}]`,
    logLabel,
    ...args.map(arg => (typeof arg === 'object' ? inspect(arg, false, null, true) : arg))
  )
}
