const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(200)
    res.json({
        RespCode:statusCode,
        stack:process.env.NODE_ENV === 'production'? null : err.stack
    })
}

export default errorHandler
