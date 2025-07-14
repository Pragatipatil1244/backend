exports.errorHandler=async(err,req,res,next)=>{
try{
    const statusCode=err.statuscode||500;
    const errorResponse={
        message:err.message||"Internal server error",
        error:err
    }
    console
    res.status(statusCode).json(errorResponse)
}
catch(e){
    next(e)
}
}