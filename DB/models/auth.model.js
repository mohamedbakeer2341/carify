import mongoose, {Schema,Types,model} from "mongoose"

const authSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:30,
    },
    lastName:{
        type:String,
        min:3,
        max:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:30
    },
    isConfirmed:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["online","offline"]
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    profilePicture:String,
    forgetCode:String,
    activationCode:String,
    role:{
        type:String,
        enum:["admin","user"]
    },
    __v:{
        type:Number,
        select:false
    }
},
{
    timestamps:true,
})

export const Auth = mongoose.models.Auth || model('Auth',authSchema)