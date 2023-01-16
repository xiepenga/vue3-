/**
 * 登录请求参数
 */
 export interface LoginParm{
    username:string;
    password:string;
    code:string
}
/**
 * 登录返回值
 */
export interface LoginResult{
    code:number;
    token:string;
    id:string;
    expireTime:string
}
export interface UserInfo{
    avatar:string;
    id:string;
    introduction:string;
    name:string;
    roles:Array<string>
}