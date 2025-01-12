import mongoose from "mongoose";


const HotelSchema = new mongoose.Schema(
    {
        name : {type:String, required : true},
        country : {
            en : {type:String, required : true},
            ru : {type:String, required : true},
            am : {type:String, required : true}
        },
        city : {
            en : {type:String, required : true},
            ru : {type:String, required : true},
            am : {type:String, required : true}
        },
        address : {type:String, required : true},
        number : {type:String, required : true},
        map : {type:String, required : true},
        mainImage : {type:String, required : true},
        images : [{type:String, required : true}],
        hotel_rooms : [{type: mongoose.Schema.Types.ObjectId, ref:"HotelRoom"}]
        
    },
    {
        timestamps: true
    }
)

const Hotels = mongoose.model("Hotels", HotelSchema)

export default Hotels