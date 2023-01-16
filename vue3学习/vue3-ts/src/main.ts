import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { key, store } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import { getStorageItem, removeStorageItem } from './utils/auth'
import {resetForm} from './utils/resetForm'
import {objCoppy} from './utils/objCoppy'
import {myConfirm} from './utils/myconfirm'



const app = createApp(App)
app.use(router).use(store, key).use(ElementPlus).mount('#app')

//清空表单
app.config.globalProperties.$resetForm = resetForm;
//对象复制
app.config.globalProperties.$objCoppy = objCoppy;
//确定弹框
app.config.globalProperties.$myConfirm = myConfirm;

// 注册全局 element-icons 组件
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
})
const whiteList = ['/login','/','/file'];
router.beforeEach(async (to, from, next) => {
    const token = getStorageItem('token')
    if (token) {
        if (to.path == 'login' || to.path == '/') {
            next({ path: '/' })
        } else {
            if (store.state.user.permissions && store.state.user.permissions.length > 0) {
                next()
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    await store.dispatch('menu/getMenuList', router)
                    next({ ...to, replace: true })
                } catch (error) {
                    removeStorageItem();
                    next({ path: 'login' })
                }
            }
        }

    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next({ path: '/login' })
        }
        next()
    }
})