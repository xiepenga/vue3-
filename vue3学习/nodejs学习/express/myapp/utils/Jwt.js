const JWT=require("jsonwebtoken")
module.exports={
    sign:(data,expiresIn)=>{
        return JWT.sign(data,"xiepeng",{expiresIn})
    },
    verify:(token)=>{
        try {
            const payload=JWT.verify(token,"xiepeng")
            return payload
        } catch (error) {
            return false
        }
    }
}