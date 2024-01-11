import joi from "joi"
import { isValidObjectId } from "../../middlewares/validation.middleware.js"

export const addUsedCarSchema = joi.object({
    name: joi.string().required(),
    brand: joi.string().required(),
    year: joi.number().min(1960).required(),
    price: joi.number().min(0).required(),
    distance: joi.number().min(0),
    transmission: joi.string(),
    years: joi.number().min(1).max(10),
    months: joi.number().min(1).max(12),
    days: joi.number().min(1).max(30),
    fuel : joi.string(),
    city : joi.string().required(),
    location : joi.string().required(),
    description : joi.string().max(5000),
    phone : joi.string().required(),
    type: joi.string().valid("sell","rent").required(),
}).required()

export const editUsedCarSchema = joi.object({
    name: joi.string(),
    carId : joi.custom(isValidObjectId),
    brand: joi.string(),
    year: joi.number().min(1960),
    price: joi.number().min(0),
    distance: joi.number().min(0),
    transmission: joi.string(),
    years: joi.number().min(1).max(10),
    months: joi.number().min(1).max(12),
    days: joi.number().min(1).max(30),
    fuel : joi.string(),
    city : joi.string(),
    location : joi.string(),
    description : joi.string().max(5000),
    phone : joi.string(),
    type: joi.string().valid("sell","rent"),
}).required()

export const deleteUsedCarSchema = joi.object({
    carId: joi.custom(isValidObjectId).required()
}).required()