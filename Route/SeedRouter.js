import { Router } from "express";
import Hotels from "../Model/Hotels.js";
import { hotelss } from "../hotelsData.js";


const SeedRouter = Router()

SeedRouter.get("/", async (req,res)=>{
    try {
        await Hotels.deleteMany({})

        const createHotels = await Hotels.insertMany(hotelss)

        res.status(200).send({ message: "Hotels Was Added" });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})

export default SeedRouter