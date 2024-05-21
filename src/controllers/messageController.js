import { Message } from "../models/Messages.js";


export const postMessage = async (req, res) => {
    const {body} = req;
    try {
        const message = await Message.create(body)
        if(!message) {
            return res.status(400)
                      .json({
                        ok: false,
                        msg: 'El mensaje no ha sido enviado'
                      })  
        }
        res.json({
            ok: true,
            message,
            msg: 'Mensaje enviado con éxito'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error con el servidor'
        })
    }
}