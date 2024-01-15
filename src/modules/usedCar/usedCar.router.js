import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js"
import { validate } from "../../middlewares/validation.middleware.js"
import { uploadMemory } from "../../utils/multer.js"
import { addUsedCar, deleteUsedCar, editUsedCar, getFilteredUsedCars } from "./usedCar.controller.js";
import { addUsedCarSchema, deleteUsedCarSchema, editUsedCarSchema } from "./usedCar.validation.js";

const router = Router()

// router.post('/', authenticate, upload().array("images"),validate(addUsedCarSchema),addUsedCar)
router.post('/', authenticate, uploadMemory().array("images"), validate(addUsedCarSchema), addUsedCar)
router.get('/', authenticate, getFilteredUsedCars)
router.patch('/:carId', authenticate, uploadMemory().array("images"), validate(editUsedCarSchema), editUsedCar)
router.delete('/:carId', authenticate, validate(deleteUsedCarSchema), deleteUsedCar)

export default router