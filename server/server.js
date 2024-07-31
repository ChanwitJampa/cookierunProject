import { initializeApp } from "firebase/app"
import { getDatabase, set, ref, get } from "firebase/database"
import express from 'express'
import bodyParser from "body-parser"

var app2 = express()
app2.use(bodyParser.json())
app2.use(bodyParser.urlencoded({ extended: true }))

var server = app2.listen(3000, console.log('server is running on port 3000'))

const firebaseConfig = {
    databaseURL: "https://cookierun-4d830-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

app2.post('/api/register', (req, res) => {

    try {
        var username = req.body.username;
        var password = req.body.password;

        console.log(username)
        set(ref(db, 'users/' + username), {
            username: username,
            password: password,
            create_time: new Date().getTime()
        })
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'test'
        })
    }
    catch (err) {
        console.log("fail on register service err :" + err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

app2.get('/api/get', (req, res) => {
    try {
        get(ref(db, 'users')).then((snapshot) => {
            console.log(snapshot.val())
            if(snapshot.exists()){
                return res.status(200).json({
                    RespCode:200,
                    RespMessage:'good',
                    Result:snapshot.val()
                })
            }else{

            }
        }).catch((err2) => {
            console.log("fail on get service err :" + err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    } catch (err) {

    }
})

