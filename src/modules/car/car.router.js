import { Router } from "express"
import { addCar, deleteCar, editCar, getFilteredCars } from "./car.controller.js"
import { authenticate } from "../../middlewares/auth.middleware.js"
import { upload } from "../../utils/multer.js"

const router = Router()

router.get('/', authenticate, getFilteredCars)
router.patch('/:id', editCar )
router.delete('/:id', deleteCar)
router.post('/', upload().single('image'),addCar)

export default router