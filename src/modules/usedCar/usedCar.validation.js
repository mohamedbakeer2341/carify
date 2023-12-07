import joi from "joi"

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
