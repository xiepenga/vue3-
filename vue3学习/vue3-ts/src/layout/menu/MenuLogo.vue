<template>
    <div class="logo" v-show="!collapse">
        <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" alt="logo" />
        <span class="title">Vue3+TypeScript实战</span>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/index';
import { computed } from 'vue';
    const stroe=useStore();
    const collapse=computed(()=>{
        return stroe.getters['menu/getCollapse']
    })
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    background-color: #2b2f3a;
    height: 50px;
    border: none;
    padding-right: 20px;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: #fff;
    img {
        width: 32px;
        height: 32px;
        margin-right: 12px;
    }
    span {
        font-weight: 600;
        line-height: 50px;
        font-size: 16px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
    }
}
</style>