<template>
    <div>
        <el-icon :size="30" @click="changeCollapse" class="icons">
            <component :is="collapse ? 'CaretRight' : 'CaretLeft'"></component>
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/index';
import { computed } from 'vue';
const stroe = useStore();
const collapse = computed(() => {

    return stroe.getters['menu/getCollapse']
})
function changeCollapse() {
    stroe.commit('menu/changeCollapse')
}

</script>

<style scoped lang="scss">
.el-icon {
    margin-left: 0;
}

.icons {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #303133;
}
</style>