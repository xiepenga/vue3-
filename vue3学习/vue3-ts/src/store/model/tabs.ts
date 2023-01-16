
export interface ITab{
    name:string,
    path:string
}
export type TabsState ={
    tabs:ITab[]
}
const state:TabsState={
    tabs:[]
}
const getters={

}
const mutations={
    removeTabs(state:TabsState,name:string){
        state.tabs=state.tabs.filter(item=>item.path!=name)
    },
    addTabs(state:TabsState,tab:ITab){
        if(!state.tabs.some(item=>item.name==tab.name)){
            state.tabs=state.tabs.concat([tab])
        }
    },
    includesTabs(state:TabsState,tabs:ITab[]){
        state.tabs=tabs
    }
}
export default {
    state,
    mutations,
    getters,
    namespaced:true
}