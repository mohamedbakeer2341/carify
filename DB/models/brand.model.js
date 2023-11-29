import mongoose, {Schema,Types,model} from "mongoose"

const brandSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:30
    },
    logo:{
        type:String,
        required:true
    },
    carId:[{
        type: Types.ObjectId,
        ref: 'Car'
    }],
    info:{
        type:String,
        default:null,
    },
    country:{
        type:String,
        default:null
    },
    __v:{
        type:Number,
        select:false
    }
},
{timestamps:true})

export const Brand = mongoose.models.Brand || model('Brand',brandSchema)