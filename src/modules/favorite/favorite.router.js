import { Router } from "express"
import { authenticate } from "../../middlewares/auth.middleware.js" 
import { addToFavorite, deleteFromFavorite, getUserFavorites } from "./favorite.controller.js"

const router = Router()

router.post('/:id', authenticate, addToFavorite)
router.get('/', authenticate, getUserFavorites)
router.delete('/:id', authenticate, deleteFromFavorite)

export default router