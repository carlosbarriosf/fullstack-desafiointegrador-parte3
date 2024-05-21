import express from "express"
import { createCart, getCartById, updateCartById } from "../controllers/cartController.js"
import { body, param } from "express-validator"
import { validationErrorResponse } from "../middlewares/validateResponse.js"

const route = express.Router()

route
    .post(
        "/",
        [
            body('items')
                .exists()
                .withMessage('El carrito no puede estar vacío')
                .isArray()
                .withMessage('El formato del campo debe ser del tipo array'),
            body('items.*.quantity')
                .exists()
                .withMessage('Este campo es requerido')
                .bail()
                .isInt({min: 1})
                .withMessage('La cantidad mínima es 1'),
            body('items.*.product')
                .exists()
                .withMessage('Este campo es requerido')
                .isMongoId()
                .withMessage('El id proporcionado no es válido'),
            body('purchased')
                .optional()
                .isBoolean()
                .withMessage('El valor del campo debe ser del tipo booleano'),
            validationErrorResponse
        ], 
        createCart
    )
    .get(
        "/get/:id", 
        [
            param('id').isMongoId().withMessage('El id del carrito no es válido'),
            validationErrorResponse
        ],
        getCartById
    )
    .put(
        "/update/:id",
        [
            param('id').isMongoId().withMessage('El id del carrito no es válido'),
            body('items')
                .exists()
                .withMessage('El carrito no puede estar vacío')
                .isArray()
                .withMessage('El formato del campo debe ser del tipo array'),
            body('items.*.quantity')
                .exists()
                .withMessage('Este campo es requerido')
                .bail()
                .isInt({min: 0})
                .withMessage('La cantidad mínima es 1'),
            body('items.*.product')
                .exists()
                .withMessage('Este campo es requerido')
                .isMongoId()
                .withMessage('El id proporcionado no es válido'),
            body('purchased')
                .optional()
                .isBoolean()
                .withMessage('El valor del campo debe ser del tipo booleano'),
            validationErrorResponse
        ], 
        updateCartById
    )

export default route