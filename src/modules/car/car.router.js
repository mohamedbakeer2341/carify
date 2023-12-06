import { Router } from "express"
import { addCar, deleteCar, editCar, getFilteredCars } from "./car.controller.js"
import { authenticate } from "../../middlewares/auth.middleware.js"
import { upload } from "../../utils/multer.js"
import { addCarSchema, editCarSchema, getFilteredCarsSchema } from "./car.validation.js"
import { validate } from "../../middlewares/validation.middleware.js"
import { authorize } from "../../middlewares/authorization.middleware.js"

const router = Router()

router.get('/', authenticate, validate(getFilteredCarsSchema), getFilteredCars)
router.patch('/:id', authenticate, authorize("admin"), upload().single("image"), validate(editCarSchema), editCar )
router.delete('/:id', authenticate, authorize("admin"), deleteCar)
router.post('/', authenticate, authorize("admin"), upload().single('image'), validate(addCarSchema), addCar)

export default router