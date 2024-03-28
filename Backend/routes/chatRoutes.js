const express=require("express");
const router=express.Router();
const {accessChat,fetchChats,createdGroupChat,renameGroup,addToGroup,removeFromGroup}=require("../controllers/chatController");
const {protects}=require("../middleware/authMiddleware");
router.route('/').post(protects,accessChat);
router.route('/').get(protects,fetchChats);


router.route('/group').post(protects,createdGroupChat);
router.route("/rename").put(protects,renameGroup);

router.route("/groupadd").put(protects,addToGroup);
router.route("/groupRemove").put(protects,removeFromGroup);
module.exports=router;
