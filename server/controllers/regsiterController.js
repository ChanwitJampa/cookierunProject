
import hashFunction from "../util/hashFunction.js"
import { set, ref, get } from "firebase/database"
import db from '../config/connection.js'

const hasSpecialCharacters = (str) => {
    const specialCharsRegex = /[^a-zA-Z0-9]/g; 
    return specialCharsRegex.test(str);
};

const register = async (req, res, next) => {
    const { username, password } = req.body
    try {
        if( hasSpecialCharacters(username)){
            res.status(400)
            throw new Error("not contain special alphabbet")
        }
        if (username === null || username ==="" ){
            res.status(400)
            throw new Error("username require")
        }
        if (password === null || password ===""){
            res.status(400)
            throw new Error("password require")
        }

        const userRef = ref(db, 'users/' + username);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            res.status(400)
            throw new Error("username aleardy exits")
        }
        const hashPassword = hashFunction.generateHash(password)
        set(ref(db, 'users/' + username), {
            username: username,
            password: hashPassword,
            create_time: new Date().getTime()
        })
        res.status(200).json({
            RespCode: 200,
            RespMessage: 'test'
        })
    }
    catch (err) {
        next(err)
    }

}
export  { register }
