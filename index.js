import { configDotenv } from "dotenv"
import cors from "cors"
import express from "express"
import cron from "node-cron"

import Connection from "./Utils/connection.js"
import Credentials from "./Config/credentials.js"
import CorsOptions from "./Config/corsOptions.js"

import SeedRouter from "./Route/SeedRouter.js"
import HotelsRouter from "./Route/HotelsRouter.js"
import AuthRouter from "./Route/AuthRouter.js"
import CartRouter from "./Route/CartRouter.js"
import UserRouter from "./Route/UserRouter.js"
import { archiveReserve } from "./Utils/archiveReserve.js"

const app = express()
const dotenv = configDotenv()
Connection()

app.use(Credentials)
app.use(cors(CorsOptions))
app.use(express.json())

app.use("/api/seed", SeedRouter)
app.use("/api/hotels", HotelsRouter)
app.use("/api/auth", AuthRouter)
app.use("/api/cart", CartRouter)
app.use("/api/user", UserRouter)


cron.schedule('0 9 * * *', () => {
    archiveReserve()
});

const PORT = process.env.PORT || 4004


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})