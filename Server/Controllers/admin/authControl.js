import User from "../../Model/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  console.log("admin back", req.body);
  const { email, password } = req.body;
  try {
    if (!email) {
      return next(errorHandler(400, "Email required"));
    }

    if (!password) {
      return next(errorHandler(400, "password required"));
    }
    const validAdmin = await User.findOne({ email, IsAdmin: true });
    console.log('2',validAdmin);
    if (!validAdmin) {
      return next(errorHandler(401, " not valid admin"));
    }
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    console.log("pass", validPassword);

    if (!validPassword){
      console.log('here');
      return next(errorHandler(401), "wrong credentials");
    } 

    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
    console.log('3',validAdmin);
    const expiryDate = new Date(Date.now() + 3600000); //1hr
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(validAdmin);
     
  } catch (error) {
    next(error);
  }
};
