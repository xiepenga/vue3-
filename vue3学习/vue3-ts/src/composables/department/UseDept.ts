import { AddDeptModel } from "@/api/dept/deptModel"
import { EditType } from "@/type/baseEnum"
import { ref } from "vue"
import {useInstance} from '@/utils/useInstance'
import { addDeptApi, deleteDeptApi, editDeptApi } from "@/api/dept/dept"
import { ElMessage } from "element-plus"

export  function useDept( getdeptData:any){
    const {global}=useInstance()
    const addEditRef=ref<{show:(type:string,row?:AddDeptModel)=>void}>()
    const addDeptBtn=()=>{
        addEditRef.value?.show(EditType.ADD)
    }
    const editDeptBtn=(row:AddDeptModel)=>{
        addEditRef.value?.show(EditType.EDIT,row)
    }
    const searchBtn=()=>{
        
    }
    const deleteDeptBtn=async(row:AddDeptModel)=>{
        const res=await global.$myConfirm('确认删除数据吗')
        
        if(res){
            deleteDeptApi({id:row.id}).then(res=>{
                ElMessage.success(res.msg||'删除成功22')
                getdeptData()
            }).catch(()=>{
                ElMessage.error('删除失败')
            })
        }
    }
    const save = async (model:AddDeptModel) =>{
        let res:any
        if(model.type==EditType.ADD){
             res=await addDeptApi(model)
        }else{
             res=await editDeptApi(model)
        }
        if(res&&res.code==200){
                getdeptData()
        }

    }

    return{
        addEditRef,
        addDeptBtn,
        editDeptBtn,
        searchBtn,
        deleteDeptBtn,
        save
    }
}