const UserModel=require("../model/UserModel")
const userService={
    userAdd:(username,password,age)=>{
        return UserModel.create({username,password,age})
    },
    userUpdate:(_id,data)=>{
        return UserModel.updateOne({_id},data)
    },
    userDelete:(_id)=>{
        return UserModel.remove({_id})
    },
    userInfo:()=>{
        return UserModel.find({},["username","age"]).sort({age:1})
    },
    login:(username,password)=>{
        return UserModel.find({username,password})
    }
}
module.exports=userService