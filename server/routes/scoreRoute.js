import express from 'express'
const router = express.Router()
import {createUserScore,getTopScores} from '../controllers/scoreController.js'

router.route('/').post(createUserScore).get(getTopScores)

export default router