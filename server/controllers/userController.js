// app2.get('/api/get', (req, res) => {
//     try {
//         get(ref(db, 'users')).then((snapshot) => {
//             console.log(snapshot.val())
//             if(snapshot.exists()){
//                 return res.status(200).json({
//                     RespCode:200,
//                     RespMessage:'good',
//                     Result:snapshot.val()
//                 })
//             }else{

//             }
//         }).catch((err2) => {
//             console.log("fail on get service err :" + err2)
//             return res.status(500).json({
//                 RespCode: 500,
//                 RespMessage: err2.message
//             })
//         })
//     } catch (err) {

//     }
// })

// app2.post('/api/getbyuser', (req, res) => {
//     var username = req.body.username;
//     var password = req.body.password;

//     try {
//         get(ref(db, 'users/'+username)).then((snapshot) => {
//             console.log(snapshot.val())
//             if(snapshot.exists()){

//                 return res.status(200).json({
//                     RespCode:200,
//                     RespMessage:'good',
//                     Result:snapshot.val()
//                 })

//             }else{

//             }
//         }).catch((err2) => {
//             console.log("fail on get service err :" + err2)
//             return res.status(500).json({
//                 RespCode: 500,
//                 RespMessage: err2.message
//             })
//         })
//     } catch (err) {

//     }
// })

// app2.post('/api/login', (req, res) => {

// })

// app2.put('/api/updatepassword', (req, res) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     console.log("test")
//     try {
//         var updates = {};
//         updates[`users/${username}/password`] = password
//         update(ref(db),updates).then(()=>{
//             return res.status(200).json({
//                 RespCode:200,
//                 RespMessage:'good'
//             })
//         }).catch((err2)=>{
//             return res.status(500).json({
//                 RespCode:500,
//                 RespMessage:'message'+err2.message
//             })
//         })
//     } catch (err) {
//         console.log(err)
//     }
// })
