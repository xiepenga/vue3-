import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/Layout.vue'
// const routes:Array<RouteRecordRaw>=[
//     {
//         path: '/login',
//         component: () => import('@/views/login/Login.vue'),
//         name:'login'
//       },
//     {
//         path: '/',
//         component: Layout,
//         redirect: '/dashboard',
//         children: [
//           {
//             path: '/dashboard',
//             component: () => import('../layout/dashboard/Index.vue'),
//             name: 'dashboard',
//             meta: {
//               title: '首页',
//               icon: '#icondashboard'
//             }
//           }
//         ]
//       },
//     {
//         path: "/system",
//         name: "system",
//         component: Layout,
//         meta: {
//             title: "系统管理",
//             icon: "el-icon-menu",
//             roles: ["sys:manage"],
//             parentId: 0,
//         },
//         children: [
//             {
//                 path: "/department",
//                 component: () => import('@/views/system/department/Department.vue'),
//                 name: "department",
//                 meta: {
//                     title: "机构管理",
//                     icon: "el-icon-document",
//                     roles: ["sys:dept"]
//                 },
//             },
//             {
//                 path: "/userList",
//                 component: () => import('../views/system/user/UserList.vue'),
//                 name: "userList",
//                 meta: {
//                     title: "用户管理",
//                     icon: "el-icon-s-custom",
//                     roles: ["sys:user"]
//                 },
//             },
//             {
//                 path: "/roleList",
//                 component: () => import('../views/system/role/RoleList.vue'),
//                 name: "roleList",
//                 meta: {
//                     title: "角色管理",
//                     icon: "el-icon-s-tools",
//                     roles: ["sys:role"]
//                 },
//             },
//             {
//                 path: "/menuList",
//                 component: () => import('../views/system/menu/MenuList.vue'),
//                 name: "menuList",
//                 meta: {
//                     title: "权限管理",
//                     icon: "el-icon-document",
//                     roles: ["sys:menu"]
//                 },
//             },
//         ],
//     },
//     {
//         path: "/goods",
//         name: "goods",
//         component: Layout,
//         meta: {
//             title: "商品管理",
//             icon: "el-icon-document",
//             roles: ["sys:goods"]
//         },
//         children: [
//             {
//                 path: "/goodCategory",
//                 component: () => import('../views/goods/goodsCategory/GoodsCategoryList.vue'),
//                 name: "goodCategory",
//                 meta: {
//                     title: "商品分类",
//                     icon: "el-icon-document",
//                     roles: ["sys:goodsCategory"]
//                 },
//             },
//         ],
//     },
//     {
//         path: "/systenConfig",
//         name: "systenConfig",
//         component: Layout,
//         meta: {
//             title: "系统工具",
//             icon: "el-icon-document",
//             roles: ["sys:systenConfig"]
//         },
//         children: [
//             {
//                 path: "/document",
//                 component: () => import('../views/systen/config/systemDocument.vue'),
//                 name: "http://42.193.158.170:8089/swagger-ui/index.html",
//                 meta: {
//                     title: "接口文档",
//                     icon: "el-icon-document",
//                     roles: ["sys:document"]
//                 },
//             },
//         ],
//     }
// ];
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/layout/dashboard/Index.vue'),
                name: 'dashboard',
                meta: {
                    title: '首页',
                    icon: '#icondashboard'
                }
            }
        ]
    },
    {
        path:'/file',
        name:'file',
        component:()=>import('@/views/file/uploadFile.vue')
    },
    {
        path: '/login',
        name:'login',
        component: () => import('@/views/login/login.vue'),
    }
]
export const router =createRouter({
    history:createWebHistory(),
    routes:constantRoutes
})
