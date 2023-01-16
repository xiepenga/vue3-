<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-active="path"
        text-color="#fff" router unique-opened :collapse="collapse" collapse-transition="false">
    <MenuItem :menuList="menuList"></MenuItem>
    </el-menu>
</template>

<script setup lang="ts">
import { reactive ,computed} from 'vue';
import { useRoute } from 'vue-router';
import MenuItem from './MenuItem.vue';
import { useStore } from '@/store/index';
    const stroe=useStore();
    const collapse=computed(()=>{
        return stroe.getters['menu/getCollapse']
    })
const menuList =computed(()=>{
    return  stroe.state.menu.menuList
})
const route=useRoute()
const path = computed(()=>{
    return route.path
})
</script>

<style scoped>
.el-menu-vertical-demo{
    height: 100%;
    border-right: 0px;
}
</style>