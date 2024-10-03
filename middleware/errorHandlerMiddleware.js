import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR
    
    const msg = err.message || "Something went wrong, try again later"
    res.status(statusCode).json({msg})
} 

export default errorHandlerMiddleware;