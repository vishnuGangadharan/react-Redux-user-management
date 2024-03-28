import User from "../Model/user.js";
import bcryptjs from 'bcryptjs'
export const signup = async(req,res) =>{

    const {userName,email,password} = req.body;
    const hashPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({
        userName,email,password:hashPassword
    });
    try{
        await newUser.save()
        res.status(201).json({message:'User created successfully'})
        res.send("ok")
    }catch(error){
        res.status(500).json(error.message)
    }
}