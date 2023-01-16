import { getMenuListApi } from "@/api/menu/menu";
import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/Layout.vue'
import { ActionContext } from "vuex";
import { RootState } from "..";

export type MenuState = {
    count: number;
    collapse: boolean;
    menuList: any[]
}
const modules = import.meta.glob('../../views/**/*.vue')
const state: MenuState = {
    count: 1,
    collapse: false,
    menuList: [
        {
            path: '/dashboard',
            component: "Layout",
            meta: {
                title: "首页",
                icon: "HomeFilled",
                roles: ["sys:manage"]
            },
            children: []
        }
    ]
}
const getters = {
    getcount(state: MenuState) {
        return state.count
    },
    getCollapse(state: MenuState) {
        return state.collapse
    }
}
const mutations = {
    setcount(state: MenuState, count: number) {
        state.count += count
    },
    changeCollapse(state: MenuState) {
        state.collapse = !state.collapse
    },
    setMenuList(state: MenuState, list: any) {
        state.menuList = state.menuList.concat(list)
    }
}
const actions = {
    getMenuList({ commit }: ActionContext<MenuState, RootState>, router: any) {
        return new Promise((reslove, reject) => {
            getMenuListApi().then(res => {
                if (res.code = 200) {
                    const accessedRoutes = filterMenulist(res.data as any[],router)

                    commit('setMenuList', accessedRoutes)
                } 

                reslove(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

function filterMenulist(data: any[],router:any) {
    let res: any = [];
    data.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../../views${component}.vue`]
            }
        }
        if (tmp.children) {
            //递归
            tmp.children = filterMenulist(tmp.children,router)
        }
        router.addRoute(tmp);
        res.push(tmp)
    })
    return res
}
export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}