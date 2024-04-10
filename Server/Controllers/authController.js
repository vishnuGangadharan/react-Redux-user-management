import User from "../Model/user.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";
import multer from 'multer';
import path from "path"
import { isEmail , isValidPhoneNumber, isValidPassword} from "../utils/error.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads'); // Save files to the public/uploads directory
    },
    filename: function (req, file, cb) {
          file.filename =file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      cb(null, file.filename ); // Generate unique filenames
    }
  });


export const signup = async(req,res,next) =>{
    
    const {username,email,phone,password} = req.body;
if(!email && !username && !password && !phone){
    return next(errorHandler(401,'empty values not allowed.!'))
}
    if(!email|| email=='') return next(errorHandler(400, 'enter a email'))
    if(!password|| password=='') return next(errorHandler(400, 'enter a password'))
    if(!username|| username=='') return next(errorHandler(400, 'enter a username'))
    if(!phone|| phone=='') return next(errorHandler(400, 'enter a phone'))

    const isemail = isEmail(email)
    if (!isemail) return next(errorHandler(400, 'Invalid Email'))
    const phoneNum = isValidPhoneNumber(phone)
    if(!phoneNum) return next(errorHandler(400,'invalid phone number'))
    const validPass = isValidPassword(password)
    if(!validPass) return next(errorHandler(400,'make a strong pasword using char&uppercase'))
    console.log("req.body", req.body);
    const hashPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({
        userName:username,email,phone,password:hashPassword
    });
    try{
        console.log("create",newUser);
        await newUser.save()
        
        res.status(201).json(newUser)
        // res.send("ok")
    }catch(error){
       next(error)
       console.log(error);
    }
}


export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || email==='' && !password || password===''){
        return next(errorHandler(401,'empty values'))
    }
    if(!email || email===''){
        return next(errorHandler(401,'add a email'))
    }
    if(!password || password===''){
        return next(errorHandler(401,'password is empty'))
    }
    try {
       const validUser = await User.findOne({ email:email}) 
       if(!validUser){
        next(errorHandler(401,'User not found'))
       }
       const ValidPassword = bcryptjs.compareSync(password,validUser.password);
       if(!ValidPassword){
        console.log(ValidPassword);
        return next(errorHandler(401,'wrong credentials'))
    }
        
      
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


const upload = multer({ storage: storage })

export const updateProfile = async(req,res,next)=>{
    console.log(req.params.id);
    // if(req.user.id !== req.params.id){
    //     return next(errorHandler(401, 'You can only update your account'))
    // }
    let password = req.body.password;
    console.log(password);
    
    // if(req.body.password){
    //     req.body.password =  bcryptjs.hashSync(req.body.password, 10)
    //     console.log('done');
    // }

    upload.single("image")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return next(errorHandler(400, 'Error uploading file'));
        }
        
        const { email, username, password } = req.body;
        if (password && !password=== '') {
            req.body.password = bcryptjs.hashSync(password, 10);
            console.log('Password hashed');
        }
        // Check if a file was uploaded
        if (req.file) {
            try {
                const user = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:{
                            userName: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            phone: req.body.phone,
                            profilePicture: req.file.filename
                        }
                    },
                    { new: true }
                );
    
                console.log('User updated:', user);
                const { password, ...rest } = user._doc;
                res.status(200).json(rest);
            } catch(error) {
                console.error(error);
                next(error);
            }
        } else {
            // If no file was uploaded, update user information without profile picture
            try {
                const user = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:{
                            userName: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            phone: req.body.phone
                        }
                    },
                    { new: true }
                );
    
                console.log('User updated:', user);
                const { password, ...rest } = user._doc;
                res.status(200).json(rest);
            } catch(error) {
                console.error(error);
                next(error);
            }
        }
    });
    
}


export const signout=async( req,res,next) =>{
   res.clearCookie('access_token').status(200).json('Signout success')
}