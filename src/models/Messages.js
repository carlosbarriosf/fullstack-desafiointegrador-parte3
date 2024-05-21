import { Schema, model } from "mongoose";


const MessageSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Message = model('Message', MessageSchema)