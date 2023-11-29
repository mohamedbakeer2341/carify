import express from "express"
import { appRouter } from "./src/utils/app.router.js"
import { connectDB } from "./DB/connection.js"
import dotenv from "dotenv"

dotenv.config()
connectDB()
const app = express()
const port = process.env.PORT || 3000
appRouter(app,express)
app.listen(port, () => console.log(`app listening on port ${port}!`))