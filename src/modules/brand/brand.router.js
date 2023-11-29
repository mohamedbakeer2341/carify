import { Router } from "express"
import { authenticate } from "../../middlewares/auth.middleware.js"
import { authorize } from "../../middlewares/authorization.middleware.js"
import { validate } from "../../middlewares/validation.middleware.js"
import { getBrands, addBrand, editBrand, deleteBrand } from "./brand.controller.js"
import { addBrandSchema, deleteBrandSchema, editBrandSchema } from "./brand.validation.js"

const router = Router()

router.get('/', authenticate, getBrands)
router.post('/', authenticate, validate(addBrandSchema), authorize("admin"),addBrand)
router.patch('/:id', authenticate, validate(editBrandSchema), authorize("admin"),editBrand)
router.delete('/:id', authenticate, validate(deleteBrandSchema), authorize("admin"),deleteBrand)

export default router