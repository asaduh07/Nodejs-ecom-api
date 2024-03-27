import { Schema } from "mongoose";

export const reviewSchema= new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"product"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"

    },
    rating:Number
})