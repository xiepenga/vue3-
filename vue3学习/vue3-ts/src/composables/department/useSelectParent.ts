import { ref } from "vue"

export function useSelectParent(){
    const parentRef=ref<{show:()=>void}>()
    const selectParent=()=>{
        parentRef.value?.show()
    }
    const select=()=>{
        
    }
    return{
        parentRef,
        selectParent
    }
}