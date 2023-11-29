import { Router } from "express"
import { authenticate } from "../../middlewares/auth.middleware.js" 
import { validate } from "../../middlewares/validation.middleware.js"
import { addToFavorite } from "./favorite.controller.js"

const router = Router()

router.post('/:id', addToFavorite)

export default router