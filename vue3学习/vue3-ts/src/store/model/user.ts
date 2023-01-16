import { getInfoApi, loginApi } from "@/api/user/user"
import { LoginParm, LoginResult, UserInfo } from "@/api/user/userModel"
import { Result } from "@/http/request"
import { setStorageItem } from "@/utils/auth"
import { ActionContext } from "vuex"
import { RootState } from "../index"

export type UserState ={
    token:string,
    userId:string,
    permissions:string[]
}
const state:UserState={
    token:'',
    userId:'',
    permissions:[]
}
const mutations={
    setToken(state:UserState,token:string){
        state.token=token
    },
    setUserId(state:UserState,id:string){
        state.userId=id
    },
    setPermissions(state:UserState,roles:string[]){
        state.permissions=roles
    }
}
const actions={
    getInfo({commit}:ActionContext<UserState,RootState>):Promise<Result<UserInfo>>{
        return new Promise((resolve,reject)=>{
            getInfoApi().then(res=>{
                if(res.code==200){
                    commit('setPermissions',res.data.roles)
                }
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
    },

    login({commit}:ActionContext<UserState,RootState>,params:LoginParm):Promise<LoginResult>{
        return new Promise((resolve,reject)=>{
             loginApi(params).then(res => {
                if (res.code == 200) {
                    commit('setToken',res.token)
                    commit('setUserId',res.id)
                    setStorageItem('token',res.token)
                    setStorageItem('userId',res.id)
                    setStorageItem('expireTime',res.expireTime)
                    
                }
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}
export default {
    state,
    mutations,
    actions,
    namespaced:true
}