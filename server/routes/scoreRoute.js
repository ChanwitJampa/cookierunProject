import express from 'express'
const router = express.Router()
import {createUserScore,getTopScores,getHistoryByuser} from '../controllers/scoreController.js'

router.route('/').post(createUserScore).get(getTopScores)
router.route('/history/').post(getHistoryByuser)
export default router