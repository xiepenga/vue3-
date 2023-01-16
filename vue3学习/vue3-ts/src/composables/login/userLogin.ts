import { getCurrentInstance } from 'vue'
import { LoginParm } from "@/api/user/UserModel";
import { useStore } from '@/store/index';
import {  useRouter } from 'vue-router';
export function userLogin(loginParams: LoginParm) {
    const { proxy } = getCurrentInstance() as any;
    //登录提交
    const router=useRouter()
    const stroe=useStore()
    const login = () => {
        proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
            if (valid) {
                stroe.dispatch('user/login',loginParams).then(res=>{
                    if(res.code===200){
                        stroe.dispatch('user/getInfo')
                        router.push({path:'/'})
                    }
                })
            }
        })
    }
    const resetFrom=()=>{
        proxy.$refs.loginFormRef.resetFields()
    }
    return {
        login,
        resetFrom
    }
}