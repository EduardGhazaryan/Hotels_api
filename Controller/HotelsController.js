import HotelsService from "../Service/HotelsService.js";

const HotelsController = {
    getHotels : async (req,res)=>{
        try {
            console.log("controller");
            const {country,city} = req.query
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";
            const data = await HotelsService.getHotels(country,city,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success,data:data.data})
            }else{
                res.status(data.status).send({message:data.message})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Internal Server Error"})
        }
    },
    getSingleHotel : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await HotelsService.getSingleHotel(id,language)

            if(data.status < 400){
                res.status(data.status).send({success:data.success,hotel:data.hotel})
            }else{
                res.status(data.status).send({message:data.message, success:data.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Internal Server Error"})
        }
    },
    getHotelRoom : async (req,res)=>{
        try {
            const {id} = req.params
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await HotelsService.getHotelRoom(id,language)

            if(data.success){
                res.status(data.status).send({room:data.room,success:data.success})

            }else{
                res.status(data.status).send({message:data.message,success:data.success})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Internal Server Error"})
        }
    }
}

export default HotelsController