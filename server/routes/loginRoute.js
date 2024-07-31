import  express from 'express'
const router = express.Router()
import {login} from '../controllers/loginController.js'

router.route('/').post(login)

export default router

