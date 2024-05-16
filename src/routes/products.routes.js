import express from "express"
import { createProduct, deleteProductById, editProductById, getProductById, getProducts } from "../controllers/productController.js";
import { upload } from "../libs/storage.js";

const route = express.Router();

route
    .post("/", upload.single("imageFile"), createProduct)
    .get("/", getProducts)
    .get("/:id", getProductById)
    .put("/edit/:id", upload.single("imageFile"), editProductById)
    .delete("/delete/:id", deleteProductById)

export default route;