import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
export default class UserRepository{
    constructor(){
        this.collection='users';
    }

     async signUp(newUser) {
        try {
            //1.get database
            const db = getDB();
            //2.get collection
            const collection = db.collection(this.collection);
            
            //3. insert the document 
            await collection.insertOne(newUser);
            
            return newUser;
    
        }catch(err){
            throw new ApplicationError("something went wrong with database",500)
        }
    }
    async signIn(email, password) {
        try{
            const db= getDB();
            const collection = db.collection(this.collection);
            //find the document
            return await collection.findOne({email,password});
        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database",500)
        }
    }
    async findByEmail(email) {
        try{
            const db= getDB();
            const collection = db.collection(this.collection);
            //find the document
            return await collection.findOne({email});
        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database",500)
        }
    }
}
