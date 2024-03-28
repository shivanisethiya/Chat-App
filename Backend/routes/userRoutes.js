const express=require("express");
const router=express.Router();
const {registerUser,authUser,allUsers}=require("../controllers/userControllers")
const {protects}=require("../middleware/authMiddleware");
router.route('/').post(registerUser).get(protects,allUsers);
router.post('/login',authUser);


module.exports=router;