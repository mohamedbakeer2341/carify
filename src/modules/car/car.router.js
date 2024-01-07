import { Router } from "express"
import { addCar, deleteCar, editCar, getFilteredCars, detectCar, getMostRecentBrandCars } from "./car.controller.js"
import { authenticate } from "../../middlewares/auth.middleware.js"
import { upload, uploadMemory } from "../../utils/multer.js"
import { addCarSchema, editCarSchema } from "./car.validation.js"
import { validate } from "../../middlewares/validation.middleware.js"
import { authorize } from "../../middlewares/authorization.middleware.js"

const router = Router()

router.get('/', authenticate, getFilteredCars)
router.patch('/:id', authenticate, authorize("admin"), upload().single("image"), validate(editCarSchema), editCar )
router.delete('/:id', authenticate, authorize("admin"), deleteCar)
router.post('/', authenticate, authorize("admin"), upload().single('image'), validate(addCarSchema), addCar)
router.post('/detect', authenticate, uploadMemory().single('image'), detectCar)
router.get('/newest', authenticate, getMostRecentBrandCars)

export default router