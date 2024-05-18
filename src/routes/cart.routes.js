import express from "express"
import { createCart, getCartById, updateCartById } from "../controllers/cartController.js"

const route = express.Router()

route
    .post("/", createCart)
    .get("/get/:id", getCartById)
    .put("/update/:id", updateCartById)

export default route