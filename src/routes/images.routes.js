import express from "express"
import { getImageById } from "../controllers/imageController.js"

const route = express.Router()

route
    .get('/:id', getImageById)

export default route