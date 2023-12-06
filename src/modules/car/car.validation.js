import joi from "joi"

export const addCarSchema = joi.object({
    id: joi.string().required(),
    brandName: joi.string().min(3).max(30).required(),
    name: joi.string().required(),
    gearBox : joi.string().required(),
    bodyType : joi.string().required(),
    price : joi.number().min(1000).required(),
    sales : joi.number().min(0).required(),
    driveType : joi.string().required(),
    topSpeed : joi.string().required(),
    acceleration : joi.string().required(),
    fuel : joi.string().required(),
    yearsOfProduction: joi.array().items(joi.number()).required()
}).required()

export const editCarSchema = joi.object({
    id: joi.string().required(),
    brandName: joi.string().min(3).max(30),
    name: joi.string(),
    gearBox : joi.string(),
    bodyType : joi.string(),
    price : joi.number().min(1000),
    sales : joi.number().min(0),
    driveType : joi.string(),
    topSpeed : joi.string(),
    acceleration : joi.string(),
    fuel : joi.string(),
    yearsOfProduction: joi.array().items(joi.number())
}).required()

export const deleteCarSchema = joi.object({
    id : joi.string().required(),
})

export const getFilteredCarsSchema = joi.object({
    sort : joi.string().valid("date","price","sales"),
    brandName : joi.string(),
    offset: joi.number(),
    limit: joi.number()
})