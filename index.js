import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { dbConnection } from "./src/database/dbConnection.js";
import productRoute from "./src/routes/products.routes.js"
import imageRoute from "./src/routes/images.routes.js"
import cartRoute from "./src/routes/cart.routes.js"
import messageRoute from "./src/routes/messages.routes.js"

const server = express()

dotenv.config()

const api = async () => {
    await dbConnection()

    server.use(express.json())
    server.use(cors())

    server.use('/public', express.static('./temp/imgs'))

    server.use("/api/products", productRoute)
    server.use("/images", imageRoute)
    server.use("/api/cart", cartRoute)
    server.use("/api/messages", messageRoute)
    
    server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
}

api()



