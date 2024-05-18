import { Schema, model } from "mongoose";


const CartSchema = new Schema({
    items: [{
        quantity: {
            type: Number,
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    }],
    purchased: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const Cart = model("Cart", CartSchema)