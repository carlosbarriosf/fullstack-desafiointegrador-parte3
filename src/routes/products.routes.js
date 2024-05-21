import express from "express"
import { createProduct, deleteProductById, editProductById, getProductById, getProducts } from "../controllers/productController.js";
import { upload } from "../libs/storage.js";
import { body, param } from "express-validator";
import {  validationErrorResponse } from "../middlewares/validateResponse.js";


const route = express.Router();

console.log(upload)

route
    .post(
        "/", 
        [
            upload.single("imageFile"),
            body('name')
                .exists()
                .withMessage('El campo es requerido')
                .bail()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:3, max: 30})
                .withMessage('El campo debe contener entre 3 y 30 caracteres'),
            body('image')
                .exists()
                .withMessage('El campo es requerido')
                .bail()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string'),
            body('price')
                .exists()
                .withMessage('El campo es requerido')
                .bail()
                .isFloat({min:0.01})
                .withMessage('El valor del campo debe ser un número mayor a 0'),    
            body('shortDesc')
                .exists()
                .withMessage('El campo es requerido')
                .bail()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:15, max: 60})
                .withMessage('El campo debe contener entre 15 y 60 caracteres'),
            body('longDesc')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string'),
            body('ageFrom')
                .optional()
                .isInt()
                .withMessage('El valor del campo debe ser un número entero'),
            body('ageTo')
                .optional()
                .isInt()
                .withMessage('El valor del campo debe ser un número entero'),
            body('brand')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:3, max: 30})
                .withMessage('El campo debe contener entre 3 y 30 caracteres'),
            body('category')
                .exists()
                .withMessage('El campo es requerido')
                .bail()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:3, max: 30})
                .withMessage('El campo debe contener entre 3 y 30 caracteres'),
            body('freeShipping')
                .optional()
                .isBoolean()
                .withMessage('El valor del campo debe ser del tipo booleano'),
            body('stock')
                .exists()
                .withMessage('El campo es requerido')
                .bail()
                .isInt({min: 1})
                .withMessage('El valor del campo debe ser un número mayor o igual a 1'),
            validationErrorResponse
        ], 
        createProduct
    )
    .get("/", getProducts)
    .get(
        "/:id",
        [
            param('id').isMongoId().withMessage('El formato del id no es correcto'),
            validationErrorResponse
        ],
        getProductById
    )
    .put(
        "/edit/:id",
        [
            upload.single("imageFile"),
            param('id').isMongoId().withMessage('El formato del id no es correcto'),
            body('name')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:3, max: 30})
                .withMessage('El campo debe contener entre 3 y 30 caracteres'),
            body('image')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string'),
            body('price')
                .optional()
                .isFloat({min:0.01})
                .withMessage('El valor del campo debe ser un número mayor a 0'),    
            body('shortDesc')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:15, max: 60})
                .withMessage('El campo debe contener entre 15 y 60 caracteres'),
            body('longDesc')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string'),
            body('ageFrom')
                .optional()
                .isInt()
                .withMessage('El valor del campo debe ser un número entero'),
            body('ageTo')
                .optional()
                .isInt()
                .withMessage('El valor del campo debe ser un número entero'),
            body('brand')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:3, max: 30})
                .withMessage('El campo debe contener entre 3 y 30 caracteres'),
            body('category')
                .optional()
                .isString()
                .withMessage('El valor del campo debe ser del tipo string')
                .bail()
                .isLength({min:3, max: 30})
                .withMessage('El campo debe contener entre 3 y 30 caracteres'),
            body('freeShipping')
                .optional()
                .isBoolean()
                .withMessage('El valor del campo debe ser del tipo booleano'),
            body('stock')
                .optional()
                .isInt({min: 1})
                .withMessage('El valor del campo debe ser un número mayor o igual a 1'),
            validationErrorResponse
        ], 
        editProductById
    )
    .delete(
        "/delete/:id",
        [
            param('id').isMongoId().withMessage('El formato del id no es correcto'),
            validationErrorResponse
        ],
        deleteProductById
    )

export default route;