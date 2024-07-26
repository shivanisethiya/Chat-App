const express =require('express');
const {protects}=require('../middleware/authMiddleware');
const {sendMessage}=require('../controllers/messagecontrollers');
const router =express.Router();

router.route('/').post(protects,sendMessage);
// router.route('/:chatId').get(protects,allMessages);

module.exports=router;
