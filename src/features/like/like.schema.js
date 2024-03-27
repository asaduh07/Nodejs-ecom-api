import mongoose, { connect } from "mongoose";
export const likeSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'types'  //refer to types for the reference collection
    },
    types:{
        type:String,
        enum:['product','category']

    }
}).pre('save',(next)=>{
    console.log("New like coming in");
    next();
}).post('save',(doc)=>{
    console.log("Like is saved");
    console.log(doc);
}).pre('find',(next)=>{
    console.log("Retriving like");
    next();
}).post('find',(docs)=>{
    console.log("Find is completed");
    console.log(docs);
})