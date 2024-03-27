import { Schema } from "mongoose";

export const categorySchema= new Schema({
    name:String,
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'product'
        }
    ]
})