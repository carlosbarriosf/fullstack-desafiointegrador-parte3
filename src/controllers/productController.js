import fs from "fs"
import { Products} from "../models/Products.js"
import { Images } from "../models/Images.js"


export const createProduct = async (req, res) => {
    const { body, file } = req
    try {
        if(!file) {
            return res.status(400)
            .json({
                ok: false,
                msg: "La foto es obligatoria"
            })  
        }
        const imageBuffer = fs.readFileSync(`./temp/imgs/${file.filename}`)
        const image = await Images.create({
            fileName: file.filename,
            image: {
                data: imageBuffer,
                contentType: "image/png"
            }
        })
        
        if(!image) {
            return res.status(400)
                      .json({
                        ok: false,
                        msg: 'No se pudo crear correctamente la imagen'
                      })  
        }

        const product = await Products.create({
            ...body,
            image: `${process.env.BASE_URL}/images/${image._id}`,
            
        })

        fs.rm(`./temp/imgs/${file.filename}`, error => {
            if(error) {
                console.log('No se ha podido eliminar el archivo')
            } else {
                console.log('El archivo se ha eliminado correctamente')
            }
        })
        
        if(!product) {
            return res.status(400)
                      .json({
                        ok: false,
                        msg: "No se pudo crear el producto"
                      })  
        }

        res.json({
            ok: true,
            product,
            msg: 'Se ha creado el producto correctamente'
        })

    } catch (error) {
        console.log('Ha habido un error al crear el producto')
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error con el servidor',
            error: {error}
        })
    }
}

export const getProducts = async (req, res) => {

    try {
        const products = await Products.find({deletedAt: {$in: [null, undefined]}});
        res.json({
            ok: true,
            products
        })
    } catch (error) {
        console.log('Ha habido un error al obtener los productos')
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error con el servidor'
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Products.findOne({_id: id})
        res.json({
            ok:true,
            product
        })
    } catch (error) {
        console.log('Ha habido un error al obtener el producto')
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error con el servidor'
        })
    }
}

export const editProductById = async (req, res) => {
    const {id} = req.params;
    const {body, file} = req;
    try {
        const product = await Products.findById(id)
        if(!product || product.deletedAt) {
            return res.status(404)
                      .json({
                        ok: false,
                        msg: 'El producto no se ha encontrado o el id es inválido'
                      })  
        }

        let imageUrl = product.image

        if(file) {
            const imageBuffer = fs.readFileSync(`./temp/imgs/${file.filename}`)
            const image = await Images.create({
                fileName: file.filename,
                image: {
                    data: imageBuffer,
                    contentType: "image/png"
                }
            })
        
            if(!image) {
                return res.status(400)
                        .json({
                            ok: false,
                            msg: 'No se pudo crear correctamente la imagen'
                        })  
            }

            
            fs.rm(`./temp/imgs/${file.filename}`, error => {
                if(error) {
                    console.log('No se ha podido eliminar el archivo')
                } else {
                    console.log('El archivo se ha eliminado correctamente')
                }
            })

            imageUrl = `${process.env.BASE_URL}/images/${image._id}`
            
        }

        const updatedProduct = await Products.findByIdAndUpdate(id, {
            ...body,
            image: imageUrl
        }, {new: true})

        console.log('llegamos hasta aqui')
        res.json({
            ok:true,
            product: updatedProduct,
            msg: 'El producto se ha editado con éxito'
        })
        console.log('llegamos hasta aqui tambien')

    } catch (error) {
        console.log('Ha habido un error al editar el producto')
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error con el servidor'
        })
    }
}

export const deleteProductById = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Products.findById(id);
        if(!product  || product.deletedAt) {
            return res.status(404)
                      .json({
                        ok: false,
                        msg: 'El producto no fue encontrado'
                      })  
        }

        await Products.findByIdAndUpdate(id, {deletedAt: new Date()}, {new: true})

        res.json({
            ok: true,
            msg: 'El producto fue eliminado correctamente'
        })
    } catch (error) {
        console.log('Ha habido un error al editar el producto')
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error con el servidor'
        })
    }
}