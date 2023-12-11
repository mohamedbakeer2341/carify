import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js"
import { validate } from "../../middlewares/validation.middleware.js"
import { upload } from "../../utils/multer.js"
import { addUsedCar, deleteUsedCar, getFilteredUsedCars } from "./usedCar.controller.js";
import { addUsedCarSchema, deleteUsedCarSchema } from "./usedCar.validation.js";

const router = Router()

// router.post('/', authenticate, upload().array("images"),validate(addUsedCarSchema),addUsedCar)
router.post('/', authenticate, upload().array("images"), validate(addUsedCarSchema), addUsedCar)
router.get('/', authenticate, getFilteredUsedCars)
router.delete('/:id', authenticate, validate(deleteUsedCarSchema), deleteUsedCar)

export default router