import express from "express"
import { createProduct, getProductById, getProducts } from "../controllers/productController.js";
import { upload } from "../libs/storage.js";

const route = express.Router();

route
    .post("/", upload.single("imageFile"), createProduct)
    .get("/", getProducts)
    .get("/:id", getProductById)

export default route;