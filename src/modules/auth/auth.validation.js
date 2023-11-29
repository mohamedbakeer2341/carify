import joi from "joi";

export const signUpSchema = joi.object({
    firstName:joi.string().required().min(3).max(30),
    lastName:joi.string().required().min(3).max(30),
    email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).lowercase().required().messages({"any.only":"Email domain must have at least 2 segments and ends with 'com' or 'net"}),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({"string.pattern.base":"Password must be at least 8 characters long"}),
    cPassword: joi.string().valid(joi.ref("password")).required().messages({"any.only":"Passwords do not match !"}),
    role: joi.string().valid("admin","user").required(),
    gender: joi.string().valid("male","female").required(),
}).required()

export const activateAccountSchema = joi.object({
    activationCode : joi.string().required(),
}).required()

export const loginSchema = joi.object({
    email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).lowercase().required(),
    password: joi.string().required()
}).required()

export const sendForgetCodeSchema = joi.object({
    email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).lowercase().required(),
}).required()

export const resetPasswordSchema = joi.object({
    email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).lowercase().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({"string.pattern.base":"Password must be at least 8 characters long"}),
    cPassword: joi.string().valid(joi.ref("password")).required().messages({"any.only":"Passwords do not match !"}),
    forgetCode:joi.string().required()
}).required()

export const changePasswordSchema = joi.object({
    oldPassword:joi.string().required(),
    newPassword:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({"string.pattern.base":"Password must be at least 8 characters long"}),
    cNewPassword:joi.string().valid(joi.ref("newPassword")).required().messages({"any.only":"Passwords do not match !"}),
}).required()

export const changeAccountDetailsSchema = joi.object({
    firstName:joi.string().min(3).max(30),
    lastName:joi.string().min(3).max(30),
}).required()
