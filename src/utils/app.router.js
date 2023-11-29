import authRouter from '../modules/auth/auth.router.js'
import brandRouter from '../modules/brand/brand.router.js'
import carRouter from '../modules/car/car.router.js'
import favoriteRouter from '../modules/favorite/favorite.router.js'

export const appRouter = (app,express)=>{
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/brand', brandRouter)
    app.use('/car', carRouter)
    app.use('/favorite', favoriteRouter)
    app.all('*', (req,res,next)=>{
        return next(new Error("Page not found"),{cause:404})
    })
    app.use((err,req,res,next)=>{
        return res.status(err.cause || 500).json({success:false,message:err.message,stack:err.stack})
    })
}