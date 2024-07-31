import { initializeApp } from "firebase/app"
import { getDatabase, set, ref, get ,update} from "firebase/database"
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

app2.post('/api/getbyuser', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    try {
        get(ref(db, 'users/'+username)).then((snapshot) => {
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

app2.post('/api/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    try {
        get(ref(db, 'users/'+username)).then((snapshot) => {
            console.log(snapshot.val())
            if(snapshot.exists()){
                console.log(`found user : ${username}  password is : ${snapshot.val().password }`)
                if(snapshot.val().password == password){
                    return res.status(200).json({
                        RespCode:200,
                        RespMessage:'login success',
                    })
                }else{
                    return res.status(200).json({
                        RespCode:500,
                        RespMessage:"incorrect password"
                    })
                }
            }else{
                return res.status(200).json({
                    RespCode:500,
                    RespMessage:"invalid username or password"
                })
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

app2.put('/api/updatepassword', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log("test")
    try {
        var updates = {};
        updates[`users/${username}/password`] = password
        update(ref(db),updates).then(()=>{
            return res.status(200).json({
                RespCode:200,
                RespMessage:'good'
            })
        }).catch((err2)=>{
            return res.status(500).json({
                RespCode:500,
                RespMessage:'message'+err2.message
            })
        })
    } catch (err) {
        console.log(err)
    }
})

app2.post('/api/getscore', (req, res) => {
    try {
        var username = req.body.username;
        var score = req.body.score;

        console.log(username)
        set(ref(db, 'scores/' + username), {
            username: username,
            score: score,
            lastest_update:new Date().getTime(),
            create_time: new Date().getTime()
        }).then((data)=>{
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'test',
                result:data
            })
        }).catch((err2)=>{
            return res.status(200).json({
                RespCode:500,
                RespMessage:"erro from get score"
            })
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









