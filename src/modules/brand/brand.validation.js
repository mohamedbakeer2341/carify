import joi from "joi"

export const addBrandSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    country: joi.string().required(),
    image: joi.string().required
}).required()

export const editBrandSchema = joi.object({
    id: joi.string().required(),
    name: joi.string().min(3).max(30),
    country: joi.string()
}).required()

export const deleteBrandSchema = joi.object({
    id: joi.string().required(),
}).required()