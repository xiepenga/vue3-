<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="tab in tabs" :key="tab.path">{{ tab.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

import {  ref, Ref, watch } from 'vue';
import { RouteLocationMatched, useRoute } from 'vue-router';
const route = useRoute()
let tabs: Ref<RouteLocationMatched[]> = ref([]);
function getBreadcrumb() {
    let routeMatched = route.matched.filter(item => item.meta && item.meta.title)
    
    if (routeMatched[0]&&routeMatched[0].path != '/dashboard') {
        let homeRoute = [{ path: '/dashboard', meta: { title: '首页' } }] as any
        routeMatched = homeRoute.concat(routeMatched)
    };
    tabs.value = routeMatched;
}
getBreadcrumb()
watch(() => route.path, () => {
    getBreadcrumb()
})
</script>

<style scoped>
</style>