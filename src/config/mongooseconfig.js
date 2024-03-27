import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";

dotenv.config();

export const connectUsingMongoose= async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected using mongoose")
        addCategories();

    }catch(err){
        console.log(err);
    }

}

async function addCategories(){
    const CategoryModel= mongoose.model('Category',categorySchema);
    const categories= await CategoryModel.find();
    if(!categories || categories.length==0){
        await CategoryModel.insertMany([{name:'Books'},{name:'Clothing'},{name:'Electronics'}]);
    }
    console.log('categories are added')
}