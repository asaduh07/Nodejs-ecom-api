import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel= mongoose.model('product',productSchema);
const ReviewModel= mongoose.model('review',reviewSchema);
const CategoryModel=mongoose.model('Category',categorySchema)
export default class ProductRepository {
    constructor() {
        this.collection = 'products';
    }


    async add(productData) {
        try {
            //1.Add product
            productData.categories=productData.category.split(',').map(e=>e.trim());
            console.log(productData)
            const newProduct= new ProductModel(productData);
            const savedProduct= await newProduct.save();
            //2.Update categories
            await CategoryModel.updateMany({
                _id:{$in:productData.categories}
            },{
                $push:{products:new ObjectId(savedProduct._id)}

            })

            
        } catch (err) {
            throw new ApplicationError("something went wrong with database", 500)
        }

    }
    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            //find the document
            return await collection.find().toArray();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500)
        }

    }

    async get(id) {
        try {

            const db = getDB();
            const collection = db.collection(this.collection);
            //find the document
            return await collection.findOne({ _id: ObjectId.createFromTime(parseInt(id.substring(0, 8), 16)) });

        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500)
        }

    }
    async filter(minPrice, categories) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if (minPrice) {
                filterExpression.price = { $gte: parseFloat(minPrice) }
            }
            //['cat1','cat2']
            categories = JSON.parse(categories.replace(/'/g, '"'));
            if (categories) {
                filterExpression = { $or: [{ category: { $in: { categories } } }, filterExpression] }
                // filterExpression.category = category;
            }
            return await collection.find(filterExpression).project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } }).toArray();

        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500)

        }
    }
    // async rate(userId,productId,rating){
    //     try{
    //         const db= getDB();
    //         const collection = db.collection(this.collection);
    //         //1. find the product
    //         const product=await collection.findOne({_id:new ObjectId(productId)});
    //         //2.find the rating of the user
    //         const userRating=product?.ratings?.find(r=>r.userId==userId);
    //         if(userRating){
    //             //3. update the rating
    //             await collection.updateOne({
    //                 _id:new ObjectId(productId),"ratings.userId": new ObjectId(userId)
    //             },{
    //                 //$ will get the first object in the ratings array based on above filter
    //                 $set:{
    //                     "ratings.$.rating":rating
    //                 }
    //             })

    //         }else{
    //             await  collection.updateOne({
    //                  _id: new ObjectId(productId)
    //              },{
    //                  $push:{ratings:{userId:new ObjectId(userId),rating}}
    //              })
    //         }

    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("something went wrong with database",500)

    //     }
    // }
    async rate(userId, productId, rating) {
        try {
            // const db = getDB();
            // const collection = db.collection(this.collection);
            // //1.removes existing entry
            // await collection.updateOne({
            //     _id: new ObjectId(productId)

            // }, {
            //     $pull: { ratings: { userId: new ObjectId(userId) } }
            // })

            // //2.Add new entry
            // await collection.updateOne({
            //     _id: new ObjectId(productId)
            // }, {
            //     $push: { ratings: { userId: new ObjectId(userId), rating } }
            // })

            //1.check if product exist
            const product=await ProductModel.findById(productId);
            if(!product){
                throw new Error('Product not found')
            }
            //2. ger the existing review
            const userReview=await ReviewModel.findOne({product:new ObjectId(productId),user: new ObjectId(userId)});
            if(userReview){
                userReview.rating=rating;
                await userReview.save();
            }else{
                const newReview= new ReviewModel({product:new ObjectId(productId),user: new ObjectId(userId),rating:rating});
                newReview.save();
            }


        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500)

        }
    }

    async averagePricePerCategory() {
        try {
            //{_id:cat1,averagePrice:50000}- array of this object for all categories
            const db = getDB();
           return await db.collection(this.collection).aggregate([
                {
                    //Stage1: Get average price per category
                    $group:{_id:"$category",averagePrice:{$avg:"$price"}}
                }
            ]).toArray();

        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500)

        }

    }

}