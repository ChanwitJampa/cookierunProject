
import { ref, get, set, update, query, orderByChild, limitToLast } from "firebase/database"
import db from '../config/connection.js'

const createUserScore = async (req, res, next) => {
    const { username, score } = req.body

    try {
        if (username === null || username === "")
            throw new Error("username require")
        if (score === null || score < 0)
            throw new Error("score require")
        let snapshot = await get(ref(db, 'scores/' + username))
        if (snapshot.exists()) {
            // console.log(`username score exits ${snapshot.val().score}`)
            // console.log(`${snapshot.val().score}`)
            if (snapshot.val().score < score) {
                //update score
                var dataUpdate = {};
                dataUpdate[`scores/${username}/score`] = score
                const refUpdate = ref(db);
                update(refUpdate, dataUpdate)
                res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'update score success '
                })

            } else {
                res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'update score success '
                })
            }
        }
        else { // not have any score let's create
            set(ref(db, 'scores/' + username), {
                username: username,
                score: score,
                lastest_update: new Date().getTime(),
                create_time: new Date().getTime()

            })
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'test'
            })
        }

    }
    catch (err) {
        next(err)
    }
}


const getTopScores = async (req, res, next) => {
    const scoresRef = ref(db, 'scores');
    try {
        const topScoresQuery = query(scoresRef, orderByChild('score'), limitToLast(5));
        const snapshot = await get(topScoresQuery);
        if (snapshot.exists()) {
            const topScores = [];
            snapshot.forEach(childSnapshot => {
                topScores.push({
                    username: childSnapshot.val().username,
                    score: childSnapshot.val().score
                });
            });
            topScores.reverse();
            return res.status(200).json({
                RespCode: 200,
                RespMessage: topScores
            })

        } else {
            res.status(404)
            throw new Error("No data available")
        }
    }
    catch (err) {
        next(err)
    }
};
export { createUserScore, getTopScores }