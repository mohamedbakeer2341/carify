import { Brand } from "../../../DB/models/brand.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { paginate } from "../../utils/paginate.js";
import  cloudinary  from "../../utils/cloud.js"
//search by id
export const getBrands = asyncHandler(async(req,res,next)=>{
    const {offset, limit} = req.query
    const {role} = req.payload
    const result = await paginate({
    selectFields: role == "admin" ? "logo name country" : "-_id logo name country",
    model:Brand, 
    offset,
    limit,
    })
    if(!result.length) return next(new Error("No brands found !",{cause:404}))
    return res.status(200).json({success:true,result})
})

export const addBrand = asyncHandler(async(req,res,next)=>{
    const {name} = req.body
    const brand = await Brand.findOne({name})
    if(brand) return next(new Error("Brand already exists !",{cause:409}))
    if(!req.file) return next(new Error("File not found !",{cause:404}))
    const result = await Brand.create({logo:"reserved",...req.body})
    const cloud = await cloudinary.uploader.upload(req.file.path,{folder:"project/brands/image", public_id:result._id})
    result.logo = cloud.secure_url
    await result.save()
    return res.status(201).json({success:true,message:"Brand added successfully !"})
})

export const editBrand = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    const brandDb = await Brand.findOne({name})
    if(brandDb) return next(new Error("Brand already exists !",{cause:409}))
    const brand = await Brand.findByIdAndUpdate(id,req.body)
    if(!brand) return next(new Error("Brand not found !",{cause:404}))
    if(req.file){
    const image = await cloudinary.uploader.upload(req.file.path,{folder:"project/brands/image", public_id:brand._id})
    brand.logo = image.secure_url
    await brand.save()
    }
    return res.status(200).json({sucess:true,message:"Brand updated successfully !"})
})

export const deleteBrand = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const public_id = `project/brands/image/${id}`
    const brand = await Brand.findByIdAndDelete(id)
    if(!brand) return next(new Error("Brand not found !",{cause:404}))
    const image = await cloudinary.uploader.destroy(public_id)
    return res.status(200).json({sucess:true,message:"Brand deleted successfully !"})
})