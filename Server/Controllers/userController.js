import User from "../Model/user.js"
import { errorHandler } from "../utils/error.js"

export const test = (req,res)=>{
    res.json({
        message:'API is working'
    })
}

export const deleteProfile = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401 , 'You cant delete this account'))
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('user has deleted.')  
    } catch (error) {
      next(error)  
    }
}