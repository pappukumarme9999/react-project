import mongoose from "mongoose";
const citySchema =new mongoose.Schema({
    name: {
        type:String,
        reuired:true
    },
    stateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'state'
    }
});
export const City=mongoose.model("city",citySchema);

