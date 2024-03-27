import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }
    async signUp(req,res,next) {
        try {
            const { name, email, password, type } = req.body;
            // const hashedPassword = await bcrypt.hash(password, 12)
            const user = new UserModel(name, email, password, type);
            await this.userRepository.signUp(user);
            res.status(201).send(user);

        } catch (err) {
            next(err);
        }

    }
    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            //1.find user by email
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send("Incorrect credentials");
            } else {
                //2.compare password with hashed password
                // const result = await bcrypt.compare(password, user.password);
                if (password==user.password) {
                    //3. create token
                    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
                        expiresIn: '1h',
                    })
                    //4.send token
                    return res.status(200).send(token);

                } else {
                    return res.status(400).send("Incorrect credentials");

                }
            }

        } catch (err) {
            next(err)
        }


    }

    async resetPassword(req,res){
        try{
            const {newPassword}=req.body;
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            const userId=req.userId;
            await this.userRepository.resetPassword(userId,hashedPassword)
            res.status(200).send("password is updated");

        }catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }

    }
}