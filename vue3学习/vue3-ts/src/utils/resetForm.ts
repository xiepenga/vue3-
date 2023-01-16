export function resetForm(formRef:any,obj:any){
    for(let key in obj){
        obj[key]=''
    }
    if(formRef){
        formRef.resetFields();
        formRef.clearValidate();
    }
}