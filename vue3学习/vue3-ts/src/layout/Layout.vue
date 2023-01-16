<template>
    <div class="common-layout">
        <el-container height="100%">
            <el-aside width="auot" >
                <MenuLogo class="layout-logo"></MenuLogo>
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <Header></Header>
                </el-header>
                <el-main class="main">
                    <Tabs></Tabs>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Aside from '@/layout/menu/Aside.vue'
import Header from '@/layout/header/Header.vue'
import MenuLogo from '@/layout/menu/MenuLogo.vue'
import Tabs from '@/layout/tab/tabs.vue'
</script>

<style lang="scss" scoped>
.common-layout{
    height: 100%;
    .el-container{
        height: 100%;
        .el-aside{
            overflow: hidden;
        }
        .el-header.header{
            padding: 0;
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--el-border-color-light);
        }
        .el-main{
            padding-top: 0;
        }
    }
}
@keyframes logoAnimation {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
}
.layout-logo {
    animation: logoAnimation 1s ease-out;
}
</style>