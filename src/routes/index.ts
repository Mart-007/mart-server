import TestPost from '../controller/TestPost'
import verifyToken from '../helpers/verifyToken'

import { Router } from 'express'

export const api: Router = Router()

/* MIDDLEWARE FOR AUTHENTICATION */
api.use(verifyToken)

/* DPH SIT Update Status Automation*/
api.post('/create/testPost', TestPost.create)
