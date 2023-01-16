import { http } from "@/http/http";
import { LoginParm, LoginResult, UserInfo } from "./userModel";


export enum Api{
    imageApi='/api/sysUser/image',
    loginApi='/api/user/login',
    infoApi='/api/sysUser/getInfo'
}
export const getImageApi=()=>{
     return http.getImage(Api.imageApi)
}
export const loginApi=(params:LoginParm)=>{
    return http.login<LoginResult>(Api.loginApi,params)
}
export const getInfoApi=()=>{
    return http.get<UserInfo>(Api.infoApi)
}
