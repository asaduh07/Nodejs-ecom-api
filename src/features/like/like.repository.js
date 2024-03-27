import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";

const Likemodel = mongoose.model('Like', likeSchema)
export default class LikeRepository {

    async getLikes(type,id){
        return await Likemodel.find({
            likeable: new ObjectId(id),
            types:type
        }).populate('user').populate({path:'likeable',model:type})
    }
    
    async likeProduct(userId, productId) {
        try {
            const newLike=new Likemodel({
                user:new ObjectId(userId),
                likeable:new ObjectId(productId),
                types:'product'
            })
            await newLike.save();

        }
        catch (err) {
            throw new ApplicationError("something went wrong with database", 500)
        }


    }
    async likeCategory(userId, categoryId) {
        try {
            const newLike=new Likemodel({
                user:new ObjectId(userId),
                likeable:new ObjectId(categoryId),
                types:'category'
            })
            await newLike.save();

        }
        catch (err) {
            throw new ApplicationError("something went wrong with database", 500)
        }

    }
}