import { Router } from "express";
import Hotels from "../Model/Hotels.js";
import HotelRoom from "../Model/HotelRoom.js";
import HotelsController from "../Controller/HotelsController.js";


const HotelsRouter = Router()

HotelsRouter.get("/", HotelsController.getHotels)

HotelsRouter.get("/:id", HotelsController.getSingleHotel)

HotelsRouter.get("/room/:id", HotelsController.getHotelRoom)

export default HotelsRouter