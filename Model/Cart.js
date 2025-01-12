import mongoose, { mongo } from "mongoose";


const CartSchema = new mongoose.Schema(
    {
        user : {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        reserved_hotels :  [{type: mongoose.Schema.Types.ObjectId, ref:"CartItem"}]
    },
    {
        timestamps:true
    }
)

const Cart = mongoose.model("Cart", CartSchema)

export default Cart