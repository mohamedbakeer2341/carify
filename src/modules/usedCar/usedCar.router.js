import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js"
import { validate } from "../../middlewares/validation.middleware.js"
import { upload } from "../../utils/multer.js"
import { addUsedCar } from "./usedCar.controller.js";
import { addUsedCarSchema } from "./usedCar.validation.js";

const router = Router()

// router.post('/', authenticate, upload().array("images"),validate(addUsedCarSchema),addUsedCar)
router.post('/', authenticate, upload().array("images"), validate(addUsedCarSchema), addUsedCar)

export default router