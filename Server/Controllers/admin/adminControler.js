import User from "../../Model/user.js";
import multer from 'multer';
import { errorHandler } from "../../utils/error.js";
import path from "path"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads'); // Save files to the public/uploads directory
    },
    filename: function (req, file, cb) {
          file.filename =file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      cb(null, file.filename ); // Generate unique filenames
    }
  });



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
    console.log('here');
    const userId = req.params.id;

    try {
        const validUser = await User.findOne({ _id: userId });
       console.log(validUser);
        if(!validUser){
            return next(errorHandler(401, 'user Not found'))
        }
        res.status(200).json(validUser);
    } catch (error) {
      next(error) 
      console.log(error); 
    }
}



const upload = multer({ storage: storage })

export const userUpdate = async (req, res, next) => {
    console.log(req.params.id);
    const validUser = await User.findOne({ _id: req.params.id })
    if (!validUser) {
        return next(errorHandler(401, 'User not found'))
    }
    
    upload.single("image")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return next(errorHandler(400, 'Error uploading file'));
        }
        
        console.log('params', req.params.id);
        try {
            const updateFields = {
                userName: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone
            };

            // Check if req.file exists before accessing its properties
            if (req.file) {
                updateFields.profilePicture = req.file.filename;
            }

            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: updateFields },
                { new: true }
            );

            const { password, ...rest } = user._doc;
            res.status(200).json(rest);
        } catch (error) {
            console.error(error);
            next(error);
        }
    });
}



export const deleteUser = async(req, res, next)=>{
    if(!req.params.id){
        return next(errorHandler(401 , 'You cant delete this account'))
    }
    try {
        await User.findByIdAndDelete(req.params.id);
      res.status(200).json('user has deleted.') 
    } catch (error) {
        next(error) 
    }
}


export const searchUser= async(req,res,next)=>{
    console.log('hlo');
    const {search} = req.body
  

   const users = await User.find({
    $or: [
        { userName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
    ]
})
console.log(users);

if(!users || users.length === 0){
    return res.status(404).json({ error: 'No users found matching the search criteria.' });
}
res.status(200).json(users) 
}


export const signout=async( req,res,next) =>{
    res.clearCookie('access_token').status(200).json('Signout success')
 }