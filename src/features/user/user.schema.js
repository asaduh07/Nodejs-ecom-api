
import { Schema } from "mongoose";

export const userSchema= new Schema({
    name: {type:String,maxLength:[25,"Name can't be gretaer than 25 characters"]},
    email:{type:String,unique:true,required:true,
        match:[/.+\@.+\../,"Pleae enter a valid email"]
    },
    password:{type:String,
        validate:{
            validator:function(value){
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
            },
            message:"Password should be between 8-12 character and have a special character"
        }
    
    },
    type:{type:String,enum:['Customer','Seller']}

})