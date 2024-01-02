import mongoose, {Schema,Types,model} from "mongoose"

// const carSchema = new Schema({
//     name:{
//         type:String,
//     },
//     image:String,
//     brandId:{
//         type: Types.ObjectId,
//         ref:'brand'
//     },
//     sales:{
//         type:Number,
//         default:null
//     },
//     bodyType: { type: String, default: null },
//     clyinders: { type: String, default: null },
//     displacement: { type: String, default: null },
//     power: { type: String, default: null },
//     torque: { type: String, default: null },
//     fuelSystem: { type: String, default: null },
//     fuel: { type: String, default: null },
//     fuelCapacity: { type: String, default: null },
//     topSpeed: { type: String, default: null },
//     acceleration: { type: String, default: null },
//     driveType: { type: String, default: null },
//     gearBox: { type: String, default: null },
//     tireSize: { type: String, default: null },
//     length: { type: String, default: null },
//     width: { type: String, default: null },
//     height: { type: String, default: null },
//     frontRearTrack: { type: String, default: null },
//     wheelBase: { type: String, default: null },
//     groundClearance: { type: String, default: null },
//     cargoVolume: { type: String, default: null },
//     aerodynamics: { type: String, default: null },
//     unladenWeight: { type: String, default: null },
//     grossWeightLimit: { type: String, default: null },
//     cityFuelConsumption: { type: String, default: null },
//     highwayFuelConsumption: { type: String, default: null },
//     FuelConsumptionCombined: { type: String, default: null },
//     co2Emissions: { type: String, default: null },
//     yearsOfProduction: { type: [Number], default: null },
//     frontBreaks: { type: String, default: null },
//     rearBreaks: { type: String, default: null },
//     yearsOfProduction: { type: [Number], default: null },
//     __v:{
//         type:Number,
//         select:false
//     }
// },{
//     timestamps:true
// })

const carSchema = new Schema({
    name:{
        type:String,
    },
    image:
        {
            primary:String,
            secondary:[String]
    }
    ,
    brandId:{
        type: Types.ObjectId,
        ref:'brand'
    },
    dealerShips:[{
        name:String,
        phone:String,
        price:Number,
    }]
    ,
    sales: Number,
    bodyType: { type: String, default: null },
    clyinders: { type: String, default: null },
    displacement: { type: String, default: null },
    power: { type: String, default: null },
    torque: { type: String, default: null },
    fuelSystem: { type: String, default: null },
    fuel: { type: String, default: null },
    fuelCapacity: { type: String, default: null },
    topSpeed: { type: String, default: null },
    acceleration: { type: String, default: null },
    driveType: { type: String, default: null },
    gearBox: { type: String, default: null },
    tireSize: { type: String, default: null },
    length: { type: String, default: null },
    width: { type: String, default: null },
    height: { type: String, default: null },
    frontRearTrack: { type: String, default: null },
    wheelBase: { type: String, default: null },
    groundClearance: { type: String, default: null },
    cargoVolume: { type: String, default: null },
    aerodynamics: { type: String, default: null },
    unladenWeight: { type: String, default: null },
    grossWeightLimit: { type: String, default: null },
    cityFuelConsumption: { type: String, default: null },
    highwayFuelConsumption: { type: String, default: null },
    FuelConsumptionCombined: { type: String, default: null },
    co2Emissions: { type: String, default: null },
    yearsOfProduction: { type: [Number], default: null },
    frontBreaks: { type: String, default: null },
    rearBreaks: { type: String, default: null },
    yearsOfProduction: { type: [Number], default: null },
    __v:{
        type:Number,
        select:false
    }
},{
    timestamps:true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})

carSchema.virtual('avgPrice').get(function(){
  let total = 0
  let num = 0
  this.dealerShips.forEach((dealerShip)=>{
    total+= dealerShip.price
    num++
  })
  return Math.floor(total/num)
})
  
  // Register the model

export const Car = mongoose.models.Car || model('Car',carSchema)