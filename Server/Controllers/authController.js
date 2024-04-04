import User from "../Model/user.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";
import multer from 'multer';
const storage = multer.memoryStorage();


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


const upload = multer({ storage: storage }).single('image'); 

export const updateProfile = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can only update your account'))
    }
    if(req.body.password){
        req.body.password =  bcryptjs.hashSync(req.body.password, 10)
    }

    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return next(errorHandler(400, 'Error uploading file'));
        }
        
        const { email, username, password } = req.body;
        
        console.log('params', req.params.id);
        try {
            console.log('here');
            console.log(req.body);
           
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:{
                        userName:req.body.username,
                        email:req.body.email,
                        password: req.body.password,
                        phone:req.body.phone,
                        ...(req.file && { profilePicture: req.file.buffer })
                    }
                },
                { new: true }
                
            );

            console.log('User updated:', user);
            const {password,...rest} = user._doc;
            res.status(200).json(rest);
        } catch(error) {
            console.error(error);
            next(error);
        }
    });
}


export const signout=async( req,res,next) =>{
   res.clearCookie('access_token').status(200).json('Signout success')
}