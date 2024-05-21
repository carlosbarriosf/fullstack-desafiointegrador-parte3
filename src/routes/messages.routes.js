import express from "express"
import { body } from "express-validator"
import { postMessage } from "../controllers/messageController.js"
import { validationErrorResponse } from "../middlewares/validateResponse.js"


const route = express.Router()

route
    .post(
        "/",
        [
            body('userName')
                .exists()
                .withMessage('El nombre es obligatorio')
                .bail()
                .isString()
                .withMessage('El valor del campo debe ser de formato string')
                .bail()
                .isLength({min: 5, max: 40})
                .withMessage('El nombre debe tener entre 5 y 40 caracteres'),
            body('userMail')
                .exists()
                .withMessage('El email es obligatorio')
                .bail()
                .isEmail()
                .withMessage('La dirección de e-mail ingresada no coincide con un formato correcto'),
            body('comment')
                .exists()
                .withMessage('El comentario es obligatorio')
                .bail()
                .isString()
                .withMessage('El valor del campo debe ser de formato string'),
                validationErrorResponse
        ],
        postMessage
    )


export default route