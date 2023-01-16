var express = require('express');
var router = express.Router();
var UserController=require("../controller/UserController");

router.post("/user/add",(req,res,next)=>{
    UserController.userAdd(req,res,next)
})
router.get("/user/getInfo",(req,res,next)=>{
    UserController.userInfo(req,res,next)
})
router.post("/user/update/:id",(req,res,next)=>{
    UserController.userUpdate(req,res,next)
})
router.get("/user/delete/:id",(req,res,next)=>{
    UserController.userDelete(req,res,next)
})
router.post("/login",(req,res,next)=>{
    console.log(1234)
    UserController.login(req,res,next)
})
module.exports = router;
