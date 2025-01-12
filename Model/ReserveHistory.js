import mongoose from "mongoose";


const ReserveHistorySchema = new mongoose.Schema(
    {
        user : {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        reserved_hotels :  [{type: mongoose.Schema.Types.ObjectId, ref:"ReserveHistoryItem"}]
    },
    {
        timestamps : true
    }
)

const ReserveHistory = mongoose.model("ReserveHistory", ReserveHistorySchema)

export default ReserveHistory