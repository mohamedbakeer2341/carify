import { asyncHandler } from "../../utils/asyncHandler.js";
import { usedCar } from "../../../DB/models/usedCar.model.js";
import cloudinary from "../../utils/cloud.js"

export const addUsedCar = asyncHandler(async (req,res,next)=>{
    const {id} = req.payload
    const { duration, type, ...data } = req.body
    if(type === "rent"){
        if(!duration) return next(new Error("Duration is required for rent cars !",{cause:400}))
        data.duration = duration
    }
    const car = await usedCar.create({userId:id, type, ...data})
    req.files.forEach(async (file) => {
        const image = await cloudinary.uploader.upload(file.path,{folder:"project/usedCar/images/"})
        car.images.push({secure_url:image.secure_url,public_id:image.public_id})
    });
    await car.save()
    return res.status(201).json({success:true,message:"Car added successfully !"})
})

