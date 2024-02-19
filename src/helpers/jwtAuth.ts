import CONFIG from '../config/config'

import { sign } from 'jsonwebtoken'

class JwtAuth {
  private JWT_SECRET_KEY: string
  private LMI_AUTH_KEY: string

  constructor() {
    this.JWT_SECRET_KEY = CONFIG.JWT_SECRET_KEY
    this.LMI_AUTH_KEY = CONFIG.LMI_AUTH_KEY
  }

  public generateJwtToken = (data, tempExpiresIn?: string | number): string => {
    const expiresIn = tempExpiresIn || 1200

    return sign({ ...data, lmiAuthKey: this.LMI_AUTH_KEY }, this.JWT_SECRET_KEY, { expiresIn })
  }
}

const jwtAuth = new JwtAuth()

export default jwtAuth
