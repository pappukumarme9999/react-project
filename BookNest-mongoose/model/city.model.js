import mongoose from "mongoose";
const citySchema =new mongoose.Schema({
    name: {
        type:String,
        reuired:true
    },
    state_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'state'
    }
});
export const City=mongoose.model("city",citySchema);