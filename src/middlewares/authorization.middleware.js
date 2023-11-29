import {asyncHandler} from "../utils/asyncHandler.js"

export const authorize = (role)=>{
    return asyncHandler(async (req,res,next)=>{
        if(req.payload.role !== role) return next(new Error("User not authorized!",{cause:403}))
        return next()
    })
}