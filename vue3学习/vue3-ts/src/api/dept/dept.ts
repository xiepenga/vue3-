import { http } from "@/http/http";
import { AddDeptModel, DeptListParam } from "./deptModel";

enum Api{
    deptListApi='/api/department/list',
    parentDeptListApi='/api/department/parent',
    addDeptApi='/api/department',
    editDeptApi='/api/department',
    deleteDeptApi='/api/department'
}
export function getDeptListApi(param:DeptListParam){
    return http.get(Api.deptListApi,param)
}
export  async function getParentDeptApi (){
    return await http.get(Api.parentDeptListApi)
}
export async function addDeptApi(params:AddDeptModel){
    return await http.post(Api.addDeptApi,params)
}
export async function editDeptApi(params:AddDeptModel){
    return await http.put(Api.editDeptApi,params)
}
export async function deleteDeptApi(params:any){
    return await http.delete(Api.deleteDeptApi,params)
}