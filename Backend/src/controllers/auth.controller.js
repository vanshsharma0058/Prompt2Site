import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
  
  const { name, email, password, authProvider } = req.body;
  //checkm the use is alredy persent or not
  const isUserisAlreadypresent = await User.findOne({
    email
  });

  if(isUserisAlreadypresent){
    return res.status(400).json({
      message:"User is already present"
    })
  }

  const hashPassword=await bcrypt.hash(password,10)

  const user=await User.create({
    name,email,
    password:hashPassword,
    authProvider
  })

  const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{
    expiresIn:"7d"
  })

  res.cookie("token",token,{
      httpOnly: true,
      secure: false,
      sameSite: "lax", //none at a time secure when true
      maxAge: 7 * 24 * 60 * 60 * 1000, //convert the 5 days into time
    })

    return res.status(201).json({
      message:"User is created Sucessfully",
      user
    })

}

async function loginUser(req,res){

  const {email,password}=req.body
  

  const user=await User.findOne({
    email
  })

  if(!user){
    return res.status(401).json({
      message:"User is not present"
    })
  }


 const isPasswordValid= await bcrypt.compare(password,user.password)

 if(!isPasswordValid){
  return res.status(401).json({
    message:"Password is wrong"
  })
 }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token",token,{
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
})

    return res.status(200).json({
      message:"User is Sucessfully login",
      user
    })

}

async function googleAuth(req, res) {
  try {
    const { name, email, avatar, authProvider } = req.body;
    //check the email and is empty or not
    if (!email) {
      return res.status(400).json({
        message: "Name and Email is required",
      });
    }

    //find user is already exist
    let user = await User.findOne({ email });
    let isNewUser = false;
    if (!user) {
      //if not then create the user
      user = await User.create({ name, email, avatar, authProvider });
      isNewUser = true;
    }
    //create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", //none at a time secure when true
      maxAge: 5 * 24 * 60 * 60 * 1000, //convert the 1 days into time
    });

    return res.status(200).json({
      message: isNewUser
        ? "New user created successfully"
        : "User logged in successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "User logged out sucessfully" });
  } catch (error) {
    return (
      res.status(500),
      json({
        message: `log out error ${err}`,
      })
    );
  }
}
export { googleAuth, logoutUser,registerUser, loginUser };
