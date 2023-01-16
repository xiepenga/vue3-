const session = require("express-session")
const userService=require("../service/UserService")
const Jwt=require('../utils/Jwt')
const UserController={
    userAdd:async (req,res,next)=>{
        const {username,password,age}=req.body
        await userService.userAdd(username,password,age)
        res.send({
            code:200,
            msg:"注册成功"
        })
    },
    userUpdate:async (req,res,next)=>{
        await userService.userUpdate(req.params.id,{password:req.body.password})
        res.send({
            code:200,
            msg:"更新成功"
        })
    },
    userDelete:async (req,res,next)=>{
        await userService.userDelete(req.params.id)
        res.send({
            code:200,
            msg:"删除成功"
        })
    },
    userInfo:async (req,res,next)=>{
        const data= await userService.userInfo()
        res.send(data)
    },
    login: async(req,res,next)=>{
        const {username,password}=req.body
        const dataList=await userService.login(username,password)
        console.log(dataList,username,password)
        if(dataList.length===0){
            res.send({
                code:300,
                msg:"密码或账号错误"
            })
        }else{
            const token=Jwt.sign({_id:dataList[0]._id,username:dataList[0].username},'1000s')
            res.header('authorization',token)
            res.send({
                code:200,
                msg:"登录成功"
            })
        }

    }
}
module.exports=UserController