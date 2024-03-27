import UserModel from "../features/user/user.model.js";
const basciAuthorizer=(req,res,next)=>{
    //1.check if authorization header is empty.

    const authHeader=req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }
    console.log(authHeader);
    //2. extract the credentials.[Basic qwertyyasdfgh]
    const base64credentials=authHeader.replace('Basic','');
    console.log(base64credentials)
    //3.Decode credentials
    const decodedCreds=Buffer.from(base64credentials,'base64').toString('utf8');
    console.log(decodedCreds);//[username:password]
    const creds=decodedCreds.split(':');

    const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials");
    }




}
export default basciAuthorizer;