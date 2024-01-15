import joi from "joi"
import { isValidObjectId } from "../../middlewares/validation.middleware.js"

export const addUsedCarSchema = joi.object({
    name: joi.string().required(),
    brand: joi.string().required(),
    year: joi.number().min(1960).max(new Date().getFullYear()).required(),
    price: joi.number().min(0).required(),
    distance: joi.number().min(0),
    duration: joi.number(),
    transmission: joi.string(),
    durationType: joi.string().valid("years", "months", "days"),
    fuel : joi.string(),
    city : joi.string().required(),
    location : joi.string().required(),
    description : joi.string().max(5000),
    phone : joi.string().required(),
    topSpeed : joi.number().min(50).max(450).required(),
    type: joi.string().valid("sell","rent").required(),
}).required()

export const editUsedCarSchema = joi.object({
    name: joi.string(),
    carId : joi.custom(isValidObjectId),
    brand: joi.string(),
    year: joi.number().min(1960).max(new Date().getFullYear()),
    price: joi.number().min(0),
    duration: joi.number(),
    distance: joi.number().min(0),
    transmission: joi.string(),
    durationType: joi.string().valid("years", "months", "days"),
    fuel : joi.string(),
    city : joi.string(),
    location : joi.string(),
    description : joi.string().max(5000),
    phone : joi.string(),
    topSpeed: joi.number().min(50).max(450),
    type: joi.string().valid("sell","rent"),
}).required()

export const deleteUsedCarSchema = joi.object({
    carId: joi.custom(isValidObjectId).required()
}).required()