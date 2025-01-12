import mongoose, { mongo } from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        firstName :{type:String, required:true},
        lastName : {type:String, required:true},
        email : {type:String, required:true},
        password : {type:String, required:true},
        access_token : {type:String, required:true},
        cart : {type: mongoose.Schema.Types.ObjectId, ref : "Cart"},
        reserve_history : {type : mongoose.Schema.Types.ObjectId, ref :"ReserveHistory"}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User",UserSchema)

export default User