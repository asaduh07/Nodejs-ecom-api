// manage routes/paths to productcontroller
//import express
import  express  from "express";
import CartController from "./cart.controller.js";
//initalise express router
const cartRouter=express.Router();
const cartController= new CartController();

//all the paths to controller methods.

cartRouter.post('/',(req,res)=>{
    cartController.add(req,res);
});
cartRouter.get('/',(req,res)=>{
    cartController.get(req,res);
});
cartRouter.delete('/:id',(req,res)=>{
    cartController.delete(req,res);
});

export  default cartRouter;