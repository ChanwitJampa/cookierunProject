import  express from 'express'
const router = express.Router()
import   {register}  from  '../controllers/regsiterController.js'

router.route('/').post(register)

export default router

