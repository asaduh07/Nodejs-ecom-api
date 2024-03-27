import './env.js'
import express from "express";
import swagger from "swagger-ui-express";
import cors from 'cors';
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import apiDocs from "./swagger.json" assert {type: 'json'};
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import orderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from './src/config/mongooseconfig.js';
import mongoose from 'mongoose';
import likeRouter from './src/features/like/like.routes.js';
//create server
const server = express();

//CORS policy configuration
server.use(cors());
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*')
//     res.header('Access-Control-Allow-Headers','*')
//     res.header('Access-Control-Allow-Methods','*')
//     //return ok for preflight request.
//     if(req.method=='OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// })

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.get('/', (req, res) => {
    res.send("welcome to Ecommerce apis")

})

// for all request related to products,redirect to product routes
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
server.use('/api/products', jwtAuth, productRouter);
server.use('/api/users', userRouter);
server.use('/api/cart', jwtAuth, cartRouter);
server.use('/api/orders', jwtAuth, orderRouter);
server.use('/api/likes', jwtAuth, likeRouter);

//middleware to handle 404 error
server.use((req, res) => {
    res.status(404).send("API not found")
})

//error handler middleware
server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        res.status(400).send(err.message);
    }
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    //server errors.
     res.status(500).send("Something went wrong, try again later");
});

// port
server.listen(3100, () => {
    console.log("server is running at 3100");
    // connectToMongoDB();
    connectUsingMongoose();
})


