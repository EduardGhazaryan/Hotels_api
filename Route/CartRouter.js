import { Router } from "express";
import CartController from "../Controller/CartController.js";


const CartRouter = Router()

CartRouter.get("/:id",CartController.getCart)

CartRouter.get("/history/:id", CartController.getReserveHistory)

CartRouter.post("/reserve", CartController.addReserve)

CartRouter.put("/reserve/change/:id", CartController.changeReserve)

CartRouter.delete("/reserve/remove/:id", CartController.removeReserve)

CartRouter.delete("/history/remove/:id", CartController.removeHistoryItem)

CartRouter.delete("/clear/:id", CartController.clearCart)

CartRouter.delete("/history/clear/:id", CartController.clearHistory)



export default CartRouter