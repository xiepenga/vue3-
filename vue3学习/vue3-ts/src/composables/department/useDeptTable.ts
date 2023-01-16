import { getDeptListApi } from "@/api/dept/dept";
import { DeptListParam } from "@/api/dept/deptModel";
import { onMounted, reactive } from "vue";

export function useDeptTable(){
    const SearchForm=reactive<DeptListParam>({
        SearchName:''
    })
    const deptListData=reactive({
        list:[]
    })
    const getdeptData=async ()=>{
        await getDeptListApi(SearchForm).then(res=>{
            if(res.code==200){
                deptListData.list=res.data as any
            }
        })
    }
    onMounted(()=>{
        getdeptData()
    })
    return {
        SearchForm,
        deptListData,
        getdeptData
    }
}