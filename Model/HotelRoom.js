import mongoose from "mongoose";


const HotelRoomSchema = new mongoose.Schema(
    {
            room_type : {type:String, required : true},
            room_price : {type:Number, required : true},
            room_images : [{type:String, required : true}],
            capacity : {type:Number, required : true},
            area : {type:Number, required : true},
            beds : {
                en : {type:String, required : true},
                ru : {type:String, required : true},
                am : {type:String, required : true}
            },
            about : {
                en : {type:String, required : true},
                ru : {type:String, required : true},
                am : {type:String, required : true}
            },
            facilities : {
                en : [{type:String, required : true}],
                ru : [{type:String, required : true}],
                am : [{type:String, required : true}]
            },
            hotel_id : {type: mongoose.Schema.Types.ObjectId, ref:"Hotels"},
            reserves : [{type: mongoose.Schema.Types.ObjectId, ref:"CartItem"}]
    },
    {
        timestamps : true
    }
)

const HotelRoom = mongoose.model("HotelRoom",HotelRoomSchema)

export default HotelRoom


// {
//     reserved_by : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
//     reserve_start: {type: String},
//     reserve_end: {type: String},
// }