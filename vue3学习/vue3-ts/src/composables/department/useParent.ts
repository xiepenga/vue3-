import { getParentDeptApi } from "@/api/dept/dept";
import { DeptModel, SelectNode } from "@/api/dept/deptModel";
import { ElTree } from "element-plus";
import { reactive, ref } from "vue";

export function useParent(){
    const treeRef=ref<InstanceType<typeof ElTree>>()
    const treeData=reactive({
        list:[]
    })
    const defaultProps = {
        children: 'children',
        label: 'name',
    }
    const selectNode=reactive<SelectNode>({
        id:'',
        name:''
    })
    const openBtn=(data:any)=>{
        data.open=!data.open
        if (treeRef.value) {
            treeRef.value.store.nodesMap[data.id].expanded = !data.open;
        }
    }
    const nodeClick=(data:DeptModel)=>{
        selectNode.id=data.id
        selectNode.name=data.name

    }
    const getParentData=async ()=>{
        
        const res=await getParentDeptApi()
        if(res&&res.code==200){
            treeData.list=res.data as any
        }
    }
    return{
        treeRef,
        treeData,
        getParentData,
        defaultProps,
        openBtn,
        nodeClick,
        selectNode
    }
}