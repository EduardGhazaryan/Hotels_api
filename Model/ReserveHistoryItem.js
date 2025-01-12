import mongoose from "mongoose";


const ReserveHistotyItemSchema = new mongoose.Schema(
    {
        reserves_history_id:{type:mongoose.Schema.Types.ObjectId, ref:"ReserveHistory"},
        user_id : {type:mongoose.Schema.Types.ObjectId, ref:"User"},
        hotel : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Hotels",
            required: true
        },
        reserved_room : {type: mongoose.Schema.Types.ObjectId, ref:"HotelRoom", required:true},
        firstName : {type:String, required:true},
        lastName : {type:String, required:true},
        email : {type:String, required:true},
        phone : {type:String, required:true},
        country : {type:String, required:true},
        people_count : {type:Number, required:true},
        description : {type:String},
        reserve_start: {type: String, required: true},
        reserve_end: {type: String, required: true},
        total_spent: {type:Number}
    },
    {
        timestamps:true
    }
)

const ReserveHistoryItem = mongoose.model("ReserveHistoryItem", ReserveHistotyItemSchema)

export default ReserveHistoryItem