import { AddDeptModel, SelectNode } from "@/api/dept/deptModel";
import { ElForm } from "element-plus";
import { reactive, ref } from "vue";

export function useBaseModel (){
    const addDeptForm=ref<InstanceType<typeof ElForm>>()
    const rules=reactive({
        parentName: [{
            required: true,
            message: '请选择上级部门',
            trigger: 'change',
        }],
        name: [{
            required: true,
            message: '请填写部门名称',
            trigger: 'change',
        }]
    })
    const dialogModel = reactive<AddDeptModel>({
        type: "",
        id: "",
        pid: "",
        parentName: "",
        manager: "",
        deptAddress: "",
        deptPhone: "",
        name: "",
        deptCode: "",
        orderNum: ""
    })
    const select=(selectNode:SelectNode)=>{
        dialogModel.parentName=selectNode.name
    }
    return {
        rules,
        addDeptForm,
        dialogModel,
        select
    }
}