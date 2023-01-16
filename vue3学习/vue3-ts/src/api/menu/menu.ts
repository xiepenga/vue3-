import { http } from "@/http/http";

export enum Api{
    getMenuList='/api/sysUser/getMenuList'
}
export  function  getMenuListApi  () {
    return http.get(Api.getMenuList)
}