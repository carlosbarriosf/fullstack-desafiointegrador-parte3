import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    longDesc: {
        type: String
    },
    ageFrom: {
        type: Number,
        default: 0
    },
    ageTo: {
        type: Number,
        default: 99
    },
    brand: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        required: true
    },
    deletedAt: {
        type: Date,

    }
}, ({timestamps: true}))

export const Products = model("Product", ProductSchema)