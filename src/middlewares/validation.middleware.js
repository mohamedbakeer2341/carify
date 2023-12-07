import {Types} from "mongoose";

export const isValidObjectId = (value,helper)=>{
    return Types.ObjectId.isValid(value) ? true : helper.message("Invalid Object ID!")
}

export const validate = (schema)=>{
    return (req,res,next)=>{
        const validationResult = schema.validate({...req.body,...req.query,...req.params},{abortEarly:false});
        if(validationResult.error)
            return next(new Error(validationResult.error,{cause:422}))
        return next()
    }
}