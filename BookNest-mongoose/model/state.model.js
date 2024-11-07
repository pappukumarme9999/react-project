import uniqueValidator from 'mongoose-unique-validator'
import mongoose from "mongoose";
const StateSchema =new mongoose.Schema({
    stateName: {
        type:String,
        required:true,
        unique : true
    }
});
StateSchema.plugin(uniqueValidator);
export const State = mongoose.model("state",StateSchema);
