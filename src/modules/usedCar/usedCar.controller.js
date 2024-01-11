import { asyncHandler } from "../../utils/asyncHandler.js";
import { usedCar } from "../../../DB/models/usedCar.model.js";
import cloudinary from "../../utils/cloud.js"
import { paginate } from "../../utils/paginate.js"
import fetch from "node-fetch";

export const addUsedCar = asyncHandler(async (req,res,next)=>{
    const {id} = req.payload
    const { duration, durationType, type, ...data } = req.body
    if(type === "rent"){
        if(!duration || !durationType) return next(new Error("Duration and duration type required for rent cars !",{cause:400}))
        data.duration = duration
        data.durationType = durationType
    }
    if(!req.files.length) return next(new Error("Images is required !",{cause:404}))
    const car = await usedCar.create({userId:id, type, ...data})
    for (const file of req.files){
        const image = await cloudinary.uploader.upload(file.path,{folder:"project/usedCar/images/"})
        car.images.push({secure_url:image.secure_url,public_id:image.public_id})
    };
    await car.save()
    return res.status(201).json({success:true, message:"Car added successfully !"})
})

export const editUsedCar = asyncHandler(async (req,res,next)=>{
    const {id} = req.payload
    const {carId} = req.params
    const {duration , type , ...data} = req.body
    if(type === "rent" && duration){
        data.duration = duration
    }
    const car = await usedCar.findOneAndUpdate({_id:carId,userId:id},{type,...data})
    if(!car) return next(new Error("Car not found !",{cause:404}))
    if(req.files.length){
        for (const file of req.files){
            const image = await cloudinary.uploader.upload(file.path,{folder:"project/usedCar/images/"})
            car.images.push({secure_url:image.secure_url,public_id:image.public_id})
        };
        await car.save()
    }
    return res.status(200).json({success:true,message:"Car added successfully !"})
})

export const deleteUsedCar = asyncHandler(async (req,res,next)=>{
    const {id} = req.payload
    const {carId} = req.params
    const car = await usedCar.findOneAndDelete({userId:id,_id:carId})
    if(!car) return next(new Error("Car not found !",{cause:404}))
    car.images.forEach(async(image)=>{
        const result = await cloudinary.uploader.destroy(image.public_id)
    })
    return res.status(200).json({success:true,message:"Car deleted successfully !"})
})

export const getUserUsedCars = asyncHandler(async (req,res,next)=>{
    const {id} = req.payload
    const cars = await usedCar.find({userId:id})
    if(!cars.length) return next(new Error("No used cars found !",{cause:404}))
    return res.status(200).json({success:true,result:cars})
})

export const getFilteredUsedCars = asyncHandler(async (req,res,next)=>{
    const {sort, offset, limit, search, type, city, sortType} = req.query
    let query = {
        $or:[
                { name:{$regex:search ? search : "", $options:'i' }}, 
                { brand:{$regex:search ? search : "", $options:'i' }}
            ],
    }
    const sortOptions = {
        price: "price",
        date: "createdAt",
        distance: "distance",
        speed: "topSpeed",
        default: null
    }
    let sortBy = sortOptions[sort] || sortOptions.default
    if(sort && sortType === "desc") sortBy = "-" + sortBy
    if (city) query.city = city
    if(type) query.type = type
    const cars = await paginate({
        sort: sortBy, 
        model:usedCar,
        query, 
        offset, 
        limit,
        populate : {path:"userId", select : "firstName lastName email profilePicture gender"},
    })
    if(!cars.length) return next(new Error("No used cars found !",{cause:404}))
    return res.status(200).json({success:true, cars})
})
