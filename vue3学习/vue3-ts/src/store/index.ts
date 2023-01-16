import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore,Store } from "vuex";
import { CommonStore } from "./helps";
import  menu,{ MenuState } from "./model/menu";
import tabs,{ TabsState } from "./model/tabs";
import user,{UserState} from './model/user'

export interface RootState {
    tabs:TabsState,
    menu:MenuState,
    user:UserState
}
export const modules = {
    tabs: tabs,
    menu: menu,
    user:user
}
export const key:InjectionKey<Store<RootState>>= Symbol();


export const store=createStore<RootState>({
    modules
})as CommonStore

export function useStore(){
    return baseUseStore(key) as CommonStore
}