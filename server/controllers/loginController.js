import Hash from '../util/hashFunction.js'
import { ref, get } from "firebase/database"
import db from '../config/connection.js'

const login = (req,res,next) =>{
    const {username,password } = req.body;


    try {
        get(ref(db, 'users/'+username)).then((snapshot) => {
            console.log(snapshot.val())
            if(snapshot.exists()){
                console.log(`found user : ${username}  password is : ${snapshot.val().password }`)
                if( Hash.compareHash(snapshot.val().password,password) ){
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
        next(err)
    }
}

export {
    login
}