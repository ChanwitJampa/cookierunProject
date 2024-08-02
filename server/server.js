

import express from 'express'
import bodyParser from "body-parser"

import ResgisterRoute from './routes/registerRoute.js'
import LoginRoute from './routes/loginRoute.js'
import ScoreRoute from './routes/scoreRoute.js'

import errorHandler from './middleware/errorMiddleware.js'
import auth from './middleware/auth.js'
//เพื่อให้รับ contrct3.netได้
import cors from 'cors';
import dotenv from 'dotenv';

// เรียกใช้เพื่อโหลดตัวแปรจาก .env เข้าไปใน process.env
dotenv.config();

var app2 = express()
app2.use(bodyParser.json())
app2.use(bodyParser.urlencoded({ extended: true }))
const allowedOrigins = ['https://preview.construct.net', 'https://construct-arcade.com'];
app2.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app2.use('/api/register', ResgisterRoute)
app2.use('/api/login', LoginRoute)
app2.use('/api/score', auth, ScoreRoute)
app2.use(errorHandler)
app2.listen(3000, console.log('server is running on port 3000'))

