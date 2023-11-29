import mongoose, {Schema,Types,model} from "mongoose"

const carSchema = new Schema({
    name:{
        type:String,
    },
    image:String,
    brandId:{
        type: Types.ObjectId,
        ref:'brand'
    },
    price:{
        type:Number,
        default:null
    },
    sales:{
        type:Number,
        default:null
    },
    bodyType:String,
    clyinders:String,
    displacement:String,
    power:String,
    torque:String,
    fuelSystem:String,
    fuel:String,
    fuelCapacity:String,
    topSpeed:String,
    acceleration:String,
    driveType:String,
    gearBox:String,
    tireSize:String,
    length:String,
    width:String,
    height:String,
    frontRearTrack:String,
    wheelBase:String,
    groundClearance:String,
    cargoVolume:String,
    aerodynamics:String,
    unladenWeight:String,
    grossWeightLimit:String,
    cityFuelConsumption:String,
    highwayFuelConsumption:String,
    FuelConsumptionCombined:String,
    co2Emissions:String,
    yearsOfProduction:[Number],
    frontBreaks:String,
    rearBreaks:String
},{
    timestamps:true
})

export const Car = mongoose.models.Car || model('Car',carSchema)