import { Car } from "../../../DB/models/car.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { paginate } from "../../utils/paginate.js";
import { Brand } from "../../../DB/models/brand.model.js";
import cloudinary from "../../utils/cloud.js";

export const getFilteredCars = asyncHandler(async (req, res, next) => {
    const { sort, brandName, offset, limit} = req.query
    const {role} = req.payload
    const query = {}
    const sortOptions = {
        date: "yearsOfProduction",
        sales: "sales",
        price: "price",
        default: null
    };
    const sortBy = sortOptions[sort] || sortOptions.default;
    if(brandName){
        const brand = await Brand.findOne({name:brandName})
        if(!brand) return next(new Error("Brand not found !",{cause:404}))
        query.brandId = brand._id
    }
    const result = await paginate({model:Car, selectFields: role == "admin" ? "" : "-_id", sort:sortBy, query, offset, limit})
    if(!result) return next(new Error("No cars found !",{cause:404}));
    return res.json({sucess:true,result})
})

export const deleteCar = asyncHandler(async (req, res, next)=>{
    const {id} = req.params
    const car = await Car.findByIdAndDelete(id)
    if(!car) return next(new Error("Car not found !",{cause:404}))
    const public_id = "project" + car.image.split("/project")[1].split(".")[0]
    console.log(public_id)
    const cloud = await cloudinary.uploader.destroy(public_id)
    return res.status(200).json({success:true,message:"Car deleted successfully !"})
})

export const editCar = asyncHandler(async (req, res, next)=>{
    const {id} = req.params
    const car = await Car.findByIdAndUpdate(id,req.body)
    if(!car) return next(new Error("Car not found !",{cause:404}))
    const cloud = await cloudinary.uploader.upload(req.file.path,{folder:"project/cars/image/",public_id:id})
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
    return res.status(200).json({sucess:true,message:"Car added sucessfully !",car})
})

