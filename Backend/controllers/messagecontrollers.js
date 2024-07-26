const asyncHandler = require("express-async-handler");

const sendMessage=asyncHandler(async(req,res)=>{
    const {content,chatId}=req.body ;
});

module.exports={sendMessage};