import mongoose, {Schema,Types,model} from 'mongoose';

const tokenSchema = new Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:Types.ObjectId,
        ref:"Auth"
    },
    agent:String,
    isValid:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
})

export const Token = mongoose.models.Token || model("Token",tokenSchema);