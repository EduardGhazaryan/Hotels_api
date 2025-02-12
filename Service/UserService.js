import Cart from "../Model/Cart.js"
import CartItem from "../Model/CartItem.js"
import HotelRoom from "../Model/HotelRoom.js"
import User from "../Model/User.js"
import bcrypt from "bcrypt"
import { generateAccessToken } from "../Utils/generateToken.js"

const UserService = {
    getUser: async(user_id)=>{
        const user = await User.findById(user_id)
        if(user){
            return {user, success:true,status: 200}
        }else{
            return {message:"Invalid ID",success:false,status:400}
        }
    },
    changeUser : async(id,firstName,lastName,email,password,language)=>{
        try {
            if(id && firstName || lastName || email || password){
                const findUser = await User.findById(id)
                if(findUser){
                    findUser.firstName = firstName ? firstName : findUser.firstName
                    findUser.lastName = lastName ? lastName : findUser.lastName
                    findUser.email = email ? email : findUser.email
                    findUser.password = password ? bcrypt.hashSync(password,10): findUser.password
                    const token = generateAccessToken(findUser)

                    await findUser.save()
                    return {status: 202, success: true, message: "User Data Already Updated", user: findUser,token }
                }else{
                return {status:404, success:false, message:"User Not Found Invalid ID"}

                }
            }else{
                return {status:400, success:false, message:"Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status : 500, message: "Internal Server Error", success:false}
        }
    },
    removeUser : async(id)=>{
        try {
            if(id){
                const findUser = await User.findById(id)

                if(findUser){
                    const findCart = await Cart.findById(findUser.cart)
                    if(findCart){
                        findCart?.reserved_hotels.map(async (h)=>{
                            let findReserve = await CartItem.findById(h)
                            if(findReserve){
                                const removeInRoom = await HotelRoom.updateOne(
                                    { _id: findReserve.reserved_room },
                                    { $pull: { reserves: h } }
                                  );
                                  const removeReserve = await CartItem.findByIdAndDelete(h)
                            }
                        })
                        const removeCart  = await Cart.findByIdAndDelete(findUser.cart)
                        const removeUser = await User.findByIdAndDelete(id)
    
                        return {status: 200, message : "User Account Successfully Deleted", success:true}
                    }else{
                        return {status : 404, message: "Cart Not Found", success:false}
                    }


                }else{
                    return {status : 404, message: "User Not Found Invalid ID", success:false}
                }
            }else{
            return {status : 400, message: "Bad Request", success:false}

            }
            
        } catch (error) {
            console.error(error)
            return {status : 500, message: "Internal Server Error", success:false}
        }
    }
}

export default UserService