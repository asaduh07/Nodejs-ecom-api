import { MongoClient } from "mongodb";

// address of database
// const url=process.env.DB_URL;

let client;
export const connectToMongoDB =()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client=clientInstance;
        console.log("Mongodb is connected");
        createCounter(client.db());
        createIndexes(client.db());
    }).catch(err=>{
        console.log(err);
    })
}
export const getClient=()=>{
    return client;
}
export const getDB=()=>{
    return client.db();


}

const createCounter=async(db)=>{
    const existingCounter=await db.collection("counters").findOne({_id:"cartItemId"});
    if(!existingCounter){
       await db.collection("counters").insertOne({
        _id:'cartItemId',value:0
       });
    }
}

const createIndexes=async(db)=>{
    try{

        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1,category:-1});
        await db.collection("products").createIndex({desc:"text"});
        console.log("indexs are created");
    }catch(err){
        console.log(err)
    }

}
