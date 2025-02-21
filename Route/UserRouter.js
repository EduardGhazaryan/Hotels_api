import { Router } from "express";
import UserController from "../Controller/UserController.js";

const UserRouter = Router()

UserRouter.get("/data", UserController.getUser)

UserRouter.put("/change/:id", UserController.changeUser)

UserRouter.delete("/remove/:id", UserController.removeUser)

export default UserRouter