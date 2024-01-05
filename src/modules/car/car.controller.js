import { Car } from "../../../DB/models/car.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { paginate } from "../../utils/paginate.js";
import { Brand } from "../../../DB/models/brand.model.js";
import cloudinary from "../../utils/cloud.js";
import FormData from "form-data"
import fetch from "node-fetch"
import axios from "axios"
import fs from "fs"

export const getFilteredCars = asyncHandler(async (req, res, next) => {
    const { sort, brandName, offset, limit, search } = req.query
    const {role} = req.payload
    const query = { name: { $regex: search ? search : "", $options: "i" } }
    const sortOptions = {
        date: "yearsOfProduction",
        sales: "sales",
        price: "avgPrice",
        default: null
    };
    const sortBy = sortOptions[sort] || sortOptions.default;
    if(brandName){
        const brand = await Brand.findOne({ name:{$regex:brandName, $options: "i"}})
        if(!brand) return next(new Error("Brand not found !",{cause:404}))
        query.brandId = brand._id
    }
    const result = await paginate({
        model:Car, 
        sort:sortBy, 
        query, 
        offset, 
        limit,
    })
    if(!result.length) return next(new Error("No cars found !",{cause:404}));
    return res.status(200).json({sucess:true,result})
})

export const deleteCar = asyncHandler(async (req, res, next)=>{
    const {id} = req.params
    const car = await Car.findByIdAndDelete(id)
    if(!car) return next(new Error("Car not found !",{cause:404}))
    const splitResult = car.image.split("/project");
    const public_id = splitResult[1] && splitResult[1].split(".")[0] ? "project" + splitResult[1].split(".")[0] : null;
    if(public_id) await cloudinary.uploader.destroy(public_id)
    return res.status(200).json({success:true,message:"Car deleted successfully !"})
})

export const editCar = asyncHandler(async (req, res, next)=>{
    const {id} = req.params
    const car = await Car.findByIdAndUpdate(id,req.body)
    if(!car) return next(new Error("Car not found !",{cause:404}))
    if(req.file){
        const image = await cloudinary.uploader.upload(req.file.path,{folder:"project/cars/image/",public_id:id})
        car.image = image.secure_url
        await car.save()
    }
    return res.status(200).json({success:true,message:"Car updated successfully !"})
})

export const addCar = asyncHandler(async (req, res, next)=>{
    const {brandName, ...data} = req.body
    if(!req.file) return next(new Error("Image not found !",{cause:404}))
    const brand = await Brand.findOne({name:brandName})
    if(!brand) return next(new Error("Brand not found !",{cause:404}))
    const car = await Car.create({brandId:brand._id,...data})
    const image = await cloudinary.uploader.upload(req.file.path,{folder:"project/cars/image/",public_id:car._id})
    car.image = image.secure_url
    await car.save()
    return res.status(201).json({sucess:true,message:"Car added sucessfully !"})
})

export const detectCar = asyncHandler(async (req, res, next)=>{
    if(!req.file) return next(new Error("Please send an image !",{cause:400}))
    const image = req.file.buffer.toString("base64")
    const checkCarResponse = await fetch("https://actual-happy-elf.ngrok-free.app/check_car_base64/",{ method:"POST", body: JSON.stringify({base64data: image}), headers: {'Content-Type': 'application/json' }})
    if(!checkCarResponse.ok) return next(new Error("Server error"))
    const isCar = await checkCarResponse.json()
    if(!isCar.data.is_car) return next(new Error("Image must be a car"))
    const response = await fetch("https://actual-happy-elf.ngrok-free.app/classify_image_base64/",{ method:"POST", body:JSON.stringify({"base64data": image}), headers:{"content-type":"application/json" }})
    const data = await response.json()
    if(!response.ok) return next(new Error(data.detail))
    const result = data.data
    result.brand = result.prediction.split(" ")[0]
    result.name = result.prediction.split(" ")[1]
    result.bodyType = result.prediction.split(" ")[2]
    result.year = result.prediction.split(" ")[3]
    delete result.prediction
    return res.status(200).json({success:true, result})
})
