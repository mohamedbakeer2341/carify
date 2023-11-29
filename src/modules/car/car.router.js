import { Router } from "express"
import { addCar, deleteCar, editCar, getFilteredCars } from "./car.controller.js"
import { authenticate } from "../../middlewares/auth.middleware.js"

const router = Router()

router.get('/', authenticate, getFilteredCars)
router.patch('/:id', editCar )
router.delete('/:id', deleteCar)
router.post('/', addCar)

export default router