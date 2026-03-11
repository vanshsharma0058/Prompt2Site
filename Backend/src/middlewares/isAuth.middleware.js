import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
   
    if (!token) {
      return res.status(401).json({
        message: " Unauthorised || Token not found",
      })
    }

    const decoded=jwt.verify(token,process.env.SECRET_KEY)

    //find the user by id come from decoded 
    req.user=await User.findById(decoded.id)
   
    next()

  } catch (error) {
    return res.status(401).json({message:"Invalid token"})
  }
};

export  {isAuth}