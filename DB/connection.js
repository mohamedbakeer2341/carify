import mongoose from 'mongoose';

export const connectDB = async()=>{
    await mongoose.connect(process.env.DB_CONNECTION)
    .then(console.log("connected to MongoDB"))
    .catch(err => console.log(err))
}