import joi from "joi"
import { isValidObjectId } from "../../middlewares/validation.middleware.js"

export const addUsedCarSchema = joi.object({
    name: joi.string().required(),
    brand: joi.string().required(),
    year: joi.number().min(1960).required(),
    price: joi.number().min(0).required(),
    distance: joi.number().min(0),
    transmission: joi.string(),
    duration : joi.number().min(3),
    fuel : joi.string(),
    city : joi.string().required(),
    location : joi.string().required(),
    description : joi.string().max(5000),
    phone : joi.string().required(),
    type: joi.string().valid("sell","rent").required(),
}).required()

export const editUsedCarSchema = joi.object({
    name: joi.string().required(),
    carId : joi.custom(isValidObjectId).required(),
    brand: joi.string().required(),
    year: joi.number().min(1960).required(),
    price: joi.number().min(0).required(),
    distance: joi.number().min(0),
    transmission: joi.string(),
    duration : joi.number().min(3),
    fuel : joi.string(),
    city : joi.string().required(),
    location : joi.string().required(),
    description : joi.string().max(5000),
    phone : joi.string().required(),
    type: joi.string().valid("sell","rent").required(),
}).required()

export const deleteUsedCarSchema = joi.object({
    carId: joi.custom(isValidObjectId).required()
}).required()