import { Schema } from "mongoose";

export const cartSchema= new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:'products'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    quantity:Number
})