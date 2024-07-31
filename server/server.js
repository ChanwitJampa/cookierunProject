

import express from 'express'
import bodyParser from "body-parser"
import ResgisterRoute from './routes/registerRoute.js'
import LoginRoute from './routes/loginRoute.js'
import errorHandler from './middleware/errorMiddleware.js'

var app2 = express()
app2.use(bodyParser.json())
app2.use(bodyParser.urlencoded({ extended: true }))



app2.use('/api/register', ResgisterRoute)
app2.use('/api/login', LoginRoute)
app2.use(errorHandler)
app2.listen(3000, console.log('server is running on port 3000'))

// app2.post('/api/getscore', (req, res) => {
//     try {
//         var username = req.body.username;
//         var score = req.body.score;

//         console.log(username)
//         set(ref(db, 'scores/' + username), {

//             username: username,
//             score: score,
//             lastest_update:new Date().getTime(),
//             create_time: new Date().getTime()

//         }).then((data)=>{
//             return res.status(200).json({
//                 RespCode: 200,
//                 RespMessage: 'test',
//                 result:data
//             })
//         }).catch((err2)=>{
//             return res.status(500).json({
//                 RespCode:500,
//                 RespMessage:"erro from get score"
//             })
//         })
      
//     }
//     catch (err) {
//         console.log("fail on register service err :" + err)
//         return res.status(500).json({
//             RespCode: 500,
//             RespMessage: err.message
//         })
//     }
// })









