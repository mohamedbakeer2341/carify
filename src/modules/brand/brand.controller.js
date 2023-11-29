import { Brand } from "../../../DB/models/brand.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { paginate } from "../../utils/paginate.js";
//search by id
export const getBrands = asyncHandler(async(req,res,next)=>{
    const {offset, limit} = req.query
    const {role} = req.payload
    const result = await paginate({selectFields: role=="admin" ? "logo name country" : "-_id logo name country",model:Brand,offset,limit})
    if(!result.length) return next(new Error("No brands found !",{cause:404}))
    return res.status(200).json({success:true,result})
})

export const addBrand = asyncHandler(async(req,res,next)=>{
    const {name} = req.body
    const brand = await Brand.findOne({name})
    if(brand) return next(new Error("Brand already exists !",{cause:409}))
    const result = await Brand.create(req.body)
    return res.status(201).json({success:true,message:"User added successfully !"})
})

export const editBrand = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const brand = await Brand.findByIdAndUpdate(id,req.body)
    if(!brand) return next(new Error("Brand not found !",{cause:404}))
    return res.status(200).json({sucess:true,message:"Brand updated successfully !"})
})

export const deleteBrand = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const brand = await Brand.findByIdAndDelete(id)
    if(!brand) return next(new Error("Brand not found !",{cause:404}))
    return res.status(200).json({sucess:true,message:"Brand deleted successfully !"})
})