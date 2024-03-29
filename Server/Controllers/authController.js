import User from "../Model/user.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";

export const signup = async(req,res,next) =>{

    const {username,email,phone,password} = req.body;
    console.log("req.body", req.body);
    const hashPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({
        userName:username,email,phone,password:hashPassword
    });
    try{
        console.log(newUser);
        await newUser.save()
        
        res.status(201).json({message:'User created successfully'})
        // res.send("ok")
    }catch(error){
       next(error)
       console.log(error);
    }
}


export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    try {
       const validUser = await User.findOne({ email:email}) 
       if(!validUser){
        next(errorHandler(401,'User not found'))
       }
       const ValidPassword = bcryptjs.compareSync(password,validUser.password);
       if(!ValidPassword) return next(errorHandler(401,'wrong credentials'))
       const token = jwt.sign({ id: validUser._id },process.env.JWT_SECRET);
    //to add token eppiry date
    const expiryDate = new Date(Date.now() + 3600000); //1hr
       res.cookie('access_token',token, { httpOnly : true , expires:expiryDate})
       .status(200)
       .json(validUser)
    } catch (error) {
        next(error)
        console.log(error);
    }
}