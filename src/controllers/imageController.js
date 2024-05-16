import { Images } from "../models/Images.js"

export const getImageById = async (req, res) => {
    const {id} = req.params
    try {
        const image = await Images.findById(id)
        const imageBuffer = Buffer.from(image.image.data)
        res.writeHead(200, {
            "Content-Type": image.image.contentType,
            "Content-Length": imageBuffer.length
        })
        res.end(imageBuffer)
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}