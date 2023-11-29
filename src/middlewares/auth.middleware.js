import jwt from "jsonwebtoken";
import { Token } from "../../DB/models/token.model.js";
import { Auth } from "../../DB/models/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async(req,res,next)=>{
    let token = req.headers.token
    if(!token) return next(new Error("Invalid token"))
    const tokenDB = await Token.findOne({token,isValid:true})
    if(!tokenDB) return next(new Error("Invalid or expired token",{cause:401}))
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    if(!decoded) return next(new Error("Invalid token",{cause:401}))
    const user = await Auth.findById(decoded.id)
    if(!user) return next(new Error("User not found",{cause:404}))
    req.payload = decoded
    req.token = token
    return next()
})