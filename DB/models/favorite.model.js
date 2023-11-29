import mongoose , {Schema,Types,model} from "mongoose"

const favoriteSchema = new Schema({
    carId:[{
        type:Types.ObjectId,
        ref:"Car",
    }],
    userId:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    }
},
{
    timestamps:true
})

export const Favorite = mongoose.models.Favorite || model("Favorite",favoriteSchema)