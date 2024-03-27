// manage routes/paths to productcontroller
//import express
import  express  from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

//initalise express router
const userRouter=express.Router();
const userController= new UserController();

//all the paths to controller methods.
//localhost/api/users
userRouter.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next);
});
userRouter.post('/signin',(req,res,next)=>{
    userController.signIn(req,res,next);
});
userRouter.put('/resetPassword',jwtAuth,(req,res)=>{
    userController.resetPassword(req,res);
});


//localhost
export  default userRouter;