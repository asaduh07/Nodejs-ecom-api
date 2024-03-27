import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class CartRepository {
    constructor() {
        this.collection = 'cart';
    }
    async add(productId, userId, quantity) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db);
            
            //find the document
            //either insert or update
            await collection.updateOne({ productId: new ObjectId(productId), userId: new ObjectId(userId) }, {
                $setOnInsert: {_id:id},
                $inc: {
                    quantity: quantity
                }
            }, {
                upsert: true
            })

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }
    async get(userId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({ userId: new ObjectId(userId) }).toArray();

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }
    async delete(cartItemId, userId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({ userId: new ObjectId(userId), _id: new ObjectId(cartItemId) });
            return result.deletedCount > 0;

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }
    async getNextCounter(db) {
        const counter = await db.collection("counters").findOneAndUpdate({
            _id: "cartItemId"
        }, {
            $inc: {value:1}
        }, {
            returnDocument:'after'
        })
        
        return counter.value;
    }

}