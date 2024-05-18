
import { Cart } from "../models/Cart.js";


export const createCart = async (req, res) => {
    const {body} = req;
    try {
        const newCart = await Cart.create(body)
        // if(!newCart) {
        //     return res.status(400)
        //                .json({
        //                 ok: false,
        //                 msg: 'Ha ocurrido un error al crear el producto'
        //                }) 
        // }
        const populatedCart = await Cart.findById(newCart._id)
                                  .populate({
                                    path: 'items',
                                    populate: {
                                        path: "product"
                                    }
                                  })  
        res.json({
            ok: true,
            populatedCart,
            msg: 'Carrito creado con éxito'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}

export const getCartById = async(req, res) => {
    const {id} = req.params;
    try {
        const cartFound = await Cart.findById(id)
                                    .populate({
                                        path: 'items',
                                        populate: {
                                            path: "product"
                                        }
                                    })
        if(!cartFound) {
            return res.status(404)
                      .json({
                        ok: false,
                        msg: 'No se ha encontrado el carrito'
                      })  
        }
        res.json({
            ok: true,
            cartFound
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}

export const updateCartById = async(req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const cartToEdit = await Cart.findById(id)
                                     
        if(!cartToEdit || cartToEdit.purchased === true) {
            return res.status(400)
                      .json({
                        ok: false,
                        msg: 'No existe el carrito a editar'
                      }) 
        }

        if(body.purchased === true) {
            const purchasedCart = await Cart.findByIdAndUpdate(id, {purchased: body.purchased}, {new: true})
            return res.json({
                ok: true,
                purchasedCart,
                msg: "Compra realizada con éxito"
            })
        }
        
        const itemMap = new Map(cartToEdit.items.map(item => [item.product.toString(), item]))

        body.items.forEach(bodyItem => {
            const {product, quantity} = bodyItem;
            const existingItem = itemMap.get(product)

            if(existingItem) {
                if(quantity === 0) {
                    cartToEdit.items = cartToEdit.items.filter(item => item.product.toString() !== product);
                } else {
                    existingItem.quantity += quantity;
                }
            } else {
                cartToEdit.items.push({
                    product,
                    quantity
                })
            }
        })

        await cartToEdit.save()


        const updatedCart = await Cart.findById(id)
                                      .populate({
                                        path: 'items',
                                        populate: {
                                            path: "product"
                                            }
                                        });


        res.json({
            ok: true,
            updatedCart,
            msg: 'Carrito actualizado con éxito'
        })                                
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}