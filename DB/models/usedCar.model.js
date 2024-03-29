import mongoose, {Schema, Types, model} from "mongoose"

const usedCarSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
        min:1960
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    images:[{
        secure_url:String,
        public_id:String
    }],
    distance:{
        type:Number,
        min:0,
        default:null
    },
    duration:{
        type:Number
    },
    transmission:{
        type:String,
        default:null
    },
    fuel:{
        type:String,
        default:null
    },
    city:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        max:5000,
        default:null
    },
    phone:{
        type:String,
        required:true
    },
    durationType:{
        type: String,
        enum:["days", "months", "years"]
    },
    type:{
        type:String,
        enum:["sell","rent"],
        required:true
    },
    topSpeed:{
        type:Number,
        required:true
    },
    userId:{
        type:Types.ObjectId,
        ref:"Auth"
    }
})

export const usedCar = mongoose.models.usedCar || model("usedCar",usedCarSchema)