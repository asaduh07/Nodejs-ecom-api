// manage routes/paths to productcontroller
//import express
import  express  from "express";
import ProductController from "./product.controller.js";
import {upload} from '../../middlewares/filupload.middleware.js'

//initalise express router
const productRouter=express.Router();
const productController= new ProductController();

//all the paths to controller methods.
//localhost/api/products
productRouter.get('/',(req,res)=>{productController.getAllProducts(req,res)});
productRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});
productRouter.get("/averagePrice",(req,res)=>{productController.averagePrice(req,res)});
productRouter.get("/filter",(req,res)=>{productController.filterProducts(req,res)});
productRouter.get("/:id",(req,res)=>{productController.getOneProduct(req,res)});
//localhost:3100/api/products/filter?minPrice=20&maxPRice=30&category=Category1
productRouter.post("/rate",(req,res,next)=>{productController.rateProduct(req,res,next)});

//localhost
export  default productRouter;