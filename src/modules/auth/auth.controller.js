import {asyncHandler} from "../../utils/asyncHandler.js"
import { Auth } from "../../../DB/models/auth.model.js"
import {nanoid} from "nanoid"
import {Favorite} from "../../../DB/models/favorite.model.js"
import {Token} from "../../../DB/models/token.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import randomString from "randomstring"
import { sendEmail } from "../../utils/sendEmail.js"
import { sendActivationLinkTemp, sendForgetCodeTemp, accountActivatedTemp, passwordResetTemp, capitalizeFirstLetter } from "../../utils/htmlTemp.js"
import cloudinary  from "../../utils/cloud.js"

export const signUp = asyncHandler(async(req,res,next)=>{
    const {email,password,firstName,lastName,gender,role} = req.body
    const user = await Auth.findOne({email})
    if(user) return next(new Error("User already exists !",{cause:409}))
    const profilePicture = gender=="male" ? "https://res.cloudinary.com/dgbtuclc2/image/upload/v1700678395/project/default/Tope_Alabi_-_Gratitude_idameg.jpg" 
    : "https://res.cloudinary.com/dgbtuclc2/image/upload/v1700678451/project/default/Extraordinary_Skin_With_The_Ordinary_fzzhqq.jpg"
    const salt = bcrypt.genSaltSync(Number(process.env.SALT))
    const hashedPassword = bcrypt.hashSync(password,salt)
    const activationCode = nanoid()
    const name = capitalizeFirstLetter(firstName)
    const mail = await sendEmail({
        to:email,
        subject:"Email Activation",
        html:sendActivationLinkTemp({activationLink:`http://localhost:3000/auth/activation/${activationCode}`,name})
    })
    if(!mail) return next(new Error("Email not found !",{cause:404}))
    const result = await Auth.create({firstName,lastName,email,password:hashedPassword,activationCode,role,gender,profilePicture})
    return res.status(201).json({success:true,message:"Please check your email !"})
})

export const activateAccount = asyncHandler(async(req,res,next)=>{
    const {activationCode} = req.params
    const user = await Auth.findOneAndUpdate({activationCode},{isConfirmed:true,$unset:{activationCode:1}})
    if(!user) return next(new Error("User not found, or the account is activated already !",{cause:404}))
    await Favorite.create({userId:user._id})
    const name = capitalizeFirstLetter(user.firstName)
    const mail = await sendEmail({to:user.email,subject:"Email Activated",html:accountActivatedTemp(name)})
    if(!mail) return next(new Error("Email not found !",{cause:404}))
    return res.status(200).json({success:true,message:"Account activated successfully !"})
})

export const login = asyncHandler(async(req,res,next)=>{
    const agent = req.headers["user-agent"]
    const {email,password} = req.body
    const user = await Auth.findOne({email})
    if(!user) return next(new Error("Email not found !",{cause:404}))
    if(!user.isConfirmed) return next(new Error("Please confirm your email to login!",{cause:403}))
    const isMatched = bcrypt.compareSync(password,user.password)
    if(!isMatched) return next(new Error("Incorrect password !",{cause:401}))
    user.status = "online"
    await user.save()
    const token = jwt.sign({email:user.email,id:user._id,role:user.role},process.env.SECRET_KEY)
    await Token.create({token,userId:user._id,agent})
    return res.status(200).json({success:true,token})
})

export const sendForgetCode = asyncHandler(async(req, res, next) => {
    const {email} = req.body
    const user = await Auth.findOne({email})
    if(!user) return next(new Error("Email not found !",{cause:404}))
    const forgetCode = randomString.generate({
        charset:"numeric",
        length:6
    })
    user.forgetCode = forgetCode
    await user.save()
    const name = capitalizeFirstLetter(user.firstName)
    const mail = await sendEmail({
        to:email,
        subject:"Forget code",
        html:sendForgetCodeTemp({forgetCode,name})
    })
    if(!mail) return next(new Error("Email not found !",{cause:404}))
    return res.status(200).json({success:true,message:"Check your email for the code !"})
})

export const resetPassword = asyncHandler(async(req, res, next) => {
    const {email,password,forgetCode} = req.body
    const user = await Auth.findOne({email})
    if(!user) return next(new Error("Email not found !",{cause:404}))
    if(user.forgetCode !== forgetCode) return next(new Error("Invalid code !",{cause:400}))
    const salt = bcrypt.genSaltSync(Number(process.env.SALT))
    const hashedPassword = bcrypt.hashSync(password,salt)
    const result = await Auth.findOneAndUpdate({email},{password:hashedPassword,$unset:{forgetCode:1}})
    const name = capitalizeFirstLetter(user.firstName)
    const mail = await sendEmail({
        to:email,
        subject:"Password reset",
        html:passwordResetTemp(name)
    })
    if(!mail) return next(new Error("Email not found !",{cause:404}))
    return res.status(200).json({success:true,message:"Password reset successfully !"})
})

export const changePassword = asyncHandler(async(req, res, next) =>{
    const {oldPassword,newPassword} = req.body
    const {id,email} = req.payload
    const user = await Auth.findById(id)
    if(!user) return next(new Error("User not found !",{cause:404}))
    const isMatched = bcrypt.compareSync(oldPassword,user.password)
    if(!isMatched) return next(new Error("Invalid password !",{cause:400}))
    const salt = bcrypt.genSaltSync(Number(process.env.SALT))
    const hashedPassword = bcrypt.hashSync(newPassword,salt)
    user.password = hashedPassword
    await user.save()
    const name = capitalizeFirstLetter(user.firstName)
    const mail = await sendEmail({
        to:email,
        subject:"Password reset",
        html:passwordResetTemp(name)
    })
    if(!mail) return next(new Error("Email not found !",{cause:404}))
    return res.status(200).json({success:true,message:"Password changed successfully"})
})

export const getProfile = asyncHandler(async(req, res, next)=>{
    const {id} = req.payload
    const result = await Auth.findById(id).select('-_id -forgetCode -password -__v')
    if(!result) return next(new Error("User not found !",{cause:404}))
    return res.status(200).json({success:true,result})
})

export const changeAccountDetails = asyncHandler(async(req,res,next)=>{
    const {id} = req.payload
    const user = await Auth.findByIdAndUpdate(id,req.body)
    if(!user) return next(new Error("User not found !",{cause:404}))
    return res.status(200).json({sucess:true,message:"Account details updated successfully"})
})

export const uploadProfilePicture = asyncHandler(async(req,res,next)=>{
    const {id} = req.payload
    const user = await Auth.findById(id)
    if(!user) return next(new Error("User not found !",{cause:404}))
    console.log(req.file)
    if(!req.file) return next(new Error("File not found !",{cause:404}))
    const result = await cloudinary.uploader.upload(req.file.path,{folder:'/project/user',public_id:id})
    user.profilePicture = result.secure_url
    await user.save()
    return res.status(200).json({sucess:true,message:"Profile picture updated successfully !"})
})

export const signOut = asyncHandler(async(req,res,next)=>{
    const {id} = req.payload
    const token = req.token
    const user = await Auth.findByIdAndUpdate(id,{status:"offline"})
    if(!user) return next(new Error("User not found !",{cause:404}))
    const result = await Token.findOneAndUpdate({token},{isValid:false})
    if(!result) return next(new Error("Token not found !",{cause:404}))
    return res.status(200).json({sucess:true,message:"Signed out successfully !"})
})