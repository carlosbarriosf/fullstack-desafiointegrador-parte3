import { Schema, model } from "mongoose";

const ImageSchema = new Schema ({
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }

    }
})

ImageSchema.index({ fileName: 1 }, { unique: true });

export const Images = model("Images", ImageSchema)