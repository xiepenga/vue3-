const mongoose=require("mongoose")
const type={
    username:String,
    password:String,
    age:Number
}
mongoose.set('strictQuery', true)
const Schema=mongoose.Schema
const UserModel=mongoose.model("user",new Schema(type))
module.exports=UserModel