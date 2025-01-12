import { Router } from "express";
import Hotels from "../Model/Hotels.js";
import HotelRoom from "../Model/HotelRoom.js";
import HotelsController from "../Controller/HotelsController.js";


const HotelsRouter = Router()

HotelsRouter.get("/", HotelsController.getHotels)

HotelsRouter.get("/:id", HotelsController.getSingleHotel)

HotelsRouter.get("/room/:id", HotelsController.getHotelRoom)

HotelsRouter.post("/add", async(req,res)=>{
    try {
        console.log("body---",req.body);
        const {name,country,city,address,number,map,mainImage,images,hotel_rooms} = req.body
        const new_hotel = new Hotels({
        name,country,city,address,number,map,mainImage,images
        })
        await new_hotel.save()
        res.status(200).send({message:"Hotel Was Added"})
        
    } catch (error) {
        console.error(error)
        res.status(500).send({message:"Internal Server Error"})
    }
})

HotelsRouter.post("/addRoom", async(req,res)=>{
    try {
        const {room_type,room_price,room_images,capacity,area,beds,about,facilities,hotel_id} = req.body
        const new_room = new HotelRoom({
            room_type,room_price,room_images,capacity,area,beds,about,facilities,hotel_id
        })
        const findHotel = await Hotels.findByIdAndUpdate(hotel_id,{$push:{hotel_rooms:new_room._id}})

        
        await new_room.save()
        await findHotel.save()
    
        res.status(200).send({message:"Room Was Added"})
        
    } catch (error) {
        console.error(error)
        res.status(500).send({message:"Internal Server Error"})
    }
})

export default HotelsRouter