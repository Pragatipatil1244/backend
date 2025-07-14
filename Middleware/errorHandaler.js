exports.errorHandler=async(err,req,resizeBy,next)=>{
try{
    const statusCode=err.statuscode||500;
    const errorResponse={
        message:err.message||"Internal server error",
        error:err
    }
    resizeBy.status(statusCode).json(errorResponse)
}
catch(e){
    next(e)
}
}