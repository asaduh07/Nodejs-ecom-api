import { Schema } from "mongoose";

export const productSchema= new Schema({
    name:String,
    price:Number,
    desc:String,
    stock:Number,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    categories:[
        {
            type:Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
})