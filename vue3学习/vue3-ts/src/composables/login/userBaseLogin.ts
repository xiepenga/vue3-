import { LoginParm } from "@/api/user/userModel"
import { ElForm } from "element-plus"
import { reactive, ref } from "vue"

export const userBaseLogin= ()=>{
    const loginFormData = reactive<LoginParm>({
        username:'',
        password:'',
        code:''
    })
    const loginFormRef=ref<InstanceType<typeof ElForm>>()
    const rules = reactive({
        username:[{
            required:true,
            trigger:'change',
            message:'请填写登录账户'
        }],
        password:[{
            required:true,
            trigger:'change',
            message:'请填写登录密码'
        }],
        code:[{
            required:true,
            trigger:'change',
            message:'请填写验证码'
        }]
    })
    return {
        loginFormData,
        loginFormRef,
        rules
    }
}