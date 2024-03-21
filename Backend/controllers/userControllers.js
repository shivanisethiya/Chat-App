const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const generateToken=require("../config/generateToken"); 
const registerUser=asyncHandler(async(req,res)=>{
       const {name,email,password,pic}=req.body;
     if(!name||!email||!password)
     {
      //   res.status(400);
        
      //   throw new Error("Please Enter all the fields");
      res.status(400).json({ message: "Please Enter all the fields" });
      return;
   }
     const userExists=await User.findOne({email});
   //   if(userExists){
   //      res.status(400);
   //      console.log("hllo");
   //      throw new Error("User already exists");
        
   //   }
   if (userExists) {
      res.status(400).json({ message: "User with this email already exists." });
      return;
  }
   
     const user=await User.create({
        name,
        email,
        password,
        pic,
     });

     if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
              
        });
     }
     else{
      //   res.status(400);
      //   throw new Error("Failed to create the user");
     
         res.status(400).json({ message: "Failed to create the user" });
         return;
 
   }

});


const authUser=asyncHandler(async(req,res)=>{
     const {email,password}=req.body;
     const user= await User.findOne({email});
     if(user && (await user.matchPassword(password)))
     {
      res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         pic:user.pic,
         token:generateToken(user._id),
           
     });
     }
     else{
      // res.status(401);
      // throw new Error("Invalid Email or Password");
   
         res.status(400).json({ message: "Invalid Email or Password" });
         return;
     
     }
});




module.exports={registerUser,authUser};