import mongoose , {Schema,Types,model} from "mongoose"

const favoriteSchema = new Schema({
    carId:[{
        type:Types.ObjectId,
        ref:"Car",
    }],
    userId:{
        type:Types.ObjectId,
        ref:"Auth",
        required:true,
        unique:true
    },
    __v:{
        type:Number,
        select:false
    }
},
{
    timestamps:true
})

export const Favorite = mongoose.models.Favorite || model("Favorite",favoriteSchema)