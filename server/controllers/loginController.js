import Hash from '../util/hashFunction.js'
import { ref, get } from "firebase/database"
import db from '../config/connection.js'
import jwt from 'jsonwebtoken'

const hasSpecialCharacters = (str) => {
    const specialCharsRegex = /[^a-zA-Z0-9]/g; 
    return specialCharsRegex.test(str);
};


const login = async(req, res, next) => {
    const { username, password } = req.body;
    
    console.log(username+ " " + password)
    try {
        if( hasSpecialCharacters(username)){
            res.status(400)
            throw new Error("not contain special alphabbet")
        }
        if (username === null || username === "" ){
            res.status(400)
            throw new Error("username require")
        }
        if (password === null || password === ""){
            res.status(400)
            throw new Error("password require")
        }
        const snapshot = await  get(ref(db, 'users/' + username))
        // console.log(snapshot.val())
        if (snapshot.exists()) {
            console.log(`found user : ${username}  password is : ${snapshot.val().password}`)
            if (Hash.compareHash(snapshot.val().password, password)) {
                const token = jwt.sign(
                    { username: username },
                    process.env.TOKEN_KEY, {
                    expiresIn: "24h"
                })
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'login success',
                    token: token,
                    token_type:"Bearer"
                })
            } else {
                res.status(400)
                throw new Error("invalid username or password")

            }
        } else {
            res.status(400)
            throw new Error("invalid username or password")

        }

    } catch (err) {
        next(err)
    }
}

export {
    login
}