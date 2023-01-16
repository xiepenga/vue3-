import { ComponentInternalInstance, getCurrentInstance } from "vue";

export function useInstance(){
        const {proxy,appContext}=getCurrentInstance() as ComponentInternalInstance
        const global =appContext.config.globalProperties
        return{
            global,
            proxy
        }
}