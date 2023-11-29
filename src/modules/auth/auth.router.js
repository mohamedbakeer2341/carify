import { Router } from "express";
import { signUp, activateAccount, login, resetPassword, sendForgetCode, changePassword, changeAccountDetails, getProfile, uploadProfilePicture, signOut } from "./auth.controller.js"
import { signUpSchema, activateAccountSchema, loginSchema, sendForgetCodeSchema, resetPasswordSchema, changePasswordSchema, changeAccountDetailsSchema } from "./auth.validation.js";
import { validate } from "../../middlewares/validation.middleware.js"
import { authenticate } from "../../middlewares/auth.middleware.js";
import { upload } from "../../utils/multer.js";

const router = Router()

router.post('/sign-up',validate(signUpSchema),signUp)
router.get('/activation/:activationCode',validate(activateAccountSchema),activateAccount)
router.post('/login',validate(loginSchema),login)
router.patch('/forgot-password',validate(sendForgetCodeSchema),sendForgetCode)
router.patch('/reset-password',validate(resetPasswordSchema),resetPassword)
router.patch('/change-password',validate(changePasswordSchema),authenticate,changePassword)
router.patch('/account-details',validate(changeAccountDetailsSchema),authenticate,changeAccountDetails)
router.get('/profile',authenticate,getProfile)
router.patch('/profile-picture',upload().single('pp'),authenticate,uploadProfilePicture)
router.patch('/logout',authenticate,signOut)

export default router