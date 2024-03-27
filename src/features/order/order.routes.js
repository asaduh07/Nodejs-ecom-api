import  express  from "express";
import OrderController from "./order.controller.js";


//initalise express router
const orderRouter=express.Router();
const orderController= new OrderController();

//all the paths to controller methods.
//localhost/api/products
orderRouter.post('/',(req,res,next)=>{orderController.placeOrder(req,res,next)});

export default orderRouter;