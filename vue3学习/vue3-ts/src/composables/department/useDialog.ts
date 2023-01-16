import { reactive } from "vue"


export function useDialog(){
    const dialogData=reactive({
        title:'',
        visible:false,
        height:300,
        width:500,
    })
    const onshow=()=>{
        dialogData.visible=true
    }
    const onClose=()=>{
        dialogData.visible=false
    }
    return{
        dialogData,
        onshow,
        onClose,
    }
}