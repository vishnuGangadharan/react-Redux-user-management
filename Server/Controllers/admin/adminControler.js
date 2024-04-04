import User from "../../Model/user.js";
import multer from 'multer';
import { errorHandler } from "../../utils/error.js";
const storage = multer.memoryStorage();

export const userDetails = async(req,res,next)=>{
    try {
        const users = await User.find({ IsAdmin: { $ne: true } });
        res.status(200).json(users);
    } catch (error) {
        next(error)
        console.log(error);
    }
}

export const userselctedTobeEdited= async(req,res,next) =>{
    const userId = req.params.id;
    try {
        const validUser = await User.findOne({ _id: userId });
       
        if(!validUser){
            return next(errorHandler(401, 'user Not found'))
        }
        res.status(200).json(validUser);
    } catch (error) {
      next(error) 
      console.log(error); 
    }
}



const upload = multer({ storage: storage }).single('image'); 

export const userUpdate= async(req,res,next)=>{
    console.log(req.params.id);
const validUser = await User.findOne({_id:req.params.id})
  if(!validUser){
    return next(errorHandler(401, 'user Not found'))
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


