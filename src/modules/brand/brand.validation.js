import joi from "joi"

export const addBrandSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    logo: joi.string().required(),
    country: joi.string().required(),
}).required()

export const editBrandSchema = joi.object({
    id: joi.string().required(),
    name: joi.string().min(3).max(30),
    logo: joi.string(),
    country: joi.string()
}).required()

export const deleteBrandSchema = joi.object({
    id: joi.string().required(),
}).required()