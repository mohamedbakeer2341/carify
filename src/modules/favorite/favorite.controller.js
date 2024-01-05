import { asyncHandler } from "../../utils/asyncHandler.js";
import { Favorite } from "../../../DB/models/favorite.model.js";
import { Auth } from "../../../DB/models/auth.model.js"
import { Car } from "../../../DB/models/car.model.js";

export const addToFavorite = asyncHandler(async (req, res, next)=>{
    const {id} = req.params
    const userId = req.payload.id
    const car = await Car.findById(id)
    if(!car) return next(new Error("Car not found !",{cause:404}))
    const user = await Auth.findById(userId)
    if(!user) return next(new Error("User not found !",{cause:404}))
    const result = await Favorite.create({userId,carId:id})
    return res.json({success:true, message:"Car added successfully !"})
})

export const deleteFromFavorite = asyncHandler(async (req, res, next)=>{
    const {id} = req.params
    const userId = req.payload.id
    const result = await Favorite.findOneAndDelete({userId, carId:id})
    if(!result) return next(new Error("Car not found !",{cause:404}))
    return res.status(200).json({success:true, message:"Car deleted successfully !"})
})

export const getUserFavorites = asyncHandler(async (req, res, next)=>{
    const {id} = req.payload
    const result = await Favorite.find({userId:id})
    if(!result) return next(new Error("No cars found !", {cause:404}))
    return res.status(200).json({success:true, result})
})