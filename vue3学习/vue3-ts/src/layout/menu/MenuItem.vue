<template>
    <template v-for="menu in menuList" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path" :key="menu.path">
            <template #title>
                <el-icon>
                    <component class="icons" :is="menu.meta.icon"></component>
                </el-icon>

                <span>{{ menu.meta.title }}</span>
            </template>
            <MenuItem :menuList="menu.children">
            </MenuItem>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path">
            <el-icon>
                <component class="icons" :is="menu.meta.icon"></component>
            </el-icon>

            <span>{{ menu.meta.title }}</span>
        </el-menu-item>
    </template>

</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps(['menuList'])
</script>

<style scoped>
</style>