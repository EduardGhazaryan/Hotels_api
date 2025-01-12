import CartService from "../Service/CartService.js";


const CartController = {
    getCart : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.getCart(id,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success, cart: data.cart})
            }else{
                res.status(data.status).send({success:data.success, message: data.message})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Internal Server Error"})
        }
    },
    getReserveHistory : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.getReserveHistory(id,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success, reserveHistory: data.reserveHistory})
            }else{
                res.status(data.status).send({success:data.success, message: data.message})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Internal Server Error"})
        }
    },
    addReserve : async (req,res)=>{
        try {
            const {userID,roomID,reserve_start,reserve_end,total_spent,firstName,lastName,email,phone,country,description,people_count} = req.body
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.addReserve(userID,roomID,reserve_start,reserve_end,total_spent,firstName,lastName,email,phone,country,description,people_count,language)

            if(data.status < 400 && data.success){
                res.status(data.status).send({message: data.message,success:data.success, reserve: data.reserve})
            }else{
                res.status(data.status).send({message: data.message,success:data.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Internal Server Error"})
        }
    },
    changeReserve : async (req,res)=>{
        try {
            const {id} = req.params
            const {firstName,lastName,email,phone,country,people_count,description,reserve_start,reserve_end}  = req.body
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.chnageReserve(id,firstName,lastName,email,phone,country,people_count,description,reserve_start,reserve_end,language)

            if(data.status < 400){
                res.status(data.status).send({message: data.message, success:data.success, result: data.result})

            }else{
                res.status(data.status).send({message: data.message, success:data.success})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Internal Server Error"})
        }
    },
    removeReserve : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.removeReserve(id,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success, message:data.message, cart:data.cart})

            }else{
                res.status(data.status).send({success:data.success, message:data.message})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).sned({message: "Internal Server Error"})
        }
    },
    removeHistoryItem : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.removeHistoryItem(id,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success, reservesHistory:data.reservesHistory})

            }else{
                res.status(data.status).send({success:data.success, message:data.message})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).sned({message: "Internal Server Error"})
        }
    },
    clearCart : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.clearCart(id,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success,  cart:data.cart})

            }else{
                res.status(data.status).send({success:data.success, message:data.message})
            }   
        } catch (error) {
            console.error(error)
            res.status(500).send({message :"Internal Server Error"})
        }
    },
    clearHistory : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await CartService.clearHistory(id,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success,  reserveHistory:data.reserveHistory})

            }else{
                res.status(data.status).send({success:data.success, message:data.message})
            }   
        } catch (error) {
            console.error(error)
            res.status(500).send({message :"Internal Server Error"})
        }
    }

}

export default CartController