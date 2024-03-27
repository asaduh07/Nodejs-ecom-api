import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

//creating model from schema
const UserModel=mongoose.model('users',userSchema);


export default class UserRepository{
    async signUp(user){
        //create instance of model
        try{

            const newUser=new UserModel(user);
            await newUser.save();
        }
        catch(err){
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }else{
                console.log(err);
                throw new ApplicationError("something went wrong with database",500)

            }

        }

    }


    async signIn(email,password){
        try{
            return await UserModel.findOne({email,password})

            
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database",500)

        }

    }
    async findByEmail(email) {
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database",500)
        }
    }

    async resetPassword(userId,hashedPassword){
        try{
            let user=await UserModel.findById(userId);
            console.log(user);
            user.password=hashedPassword;
            user.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database",500)
        }

    }
}