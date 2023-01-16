<template>
    <sysDialog :title="dialogData.title" :visible="dialogData.visible" :height="dialogData.height"
        :width="dialogData.width" @onClose="onClose" @confirm="confirm">
        <template v-slot:content>
            <el-tree ref="treeRef" class="filter-tree" :data="treeData.list" :props="defaultProps" 
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="nodeClick">
                <template #default="{ node, data }">
                    <div class="custom-tree-node">
                    <span v-if="data.children&&data.children.length>0" @click="openBtn(data)">
                    <component style="width: 1.1em; height: 1.1em; margin-right: 5px;color: #8c8c8c;" :is="data.open ? Plus : Minus" />
                    </span>
                    <span v-else ></span>
                    <DocumentRemove style="width: 1.3em; height: 1.3em; margin-right: 5px;color: #8c8c8c;"></DocumentRemove>
                    </div>
                    <span>{{ node.label }}</span>
                </template>
            </el-tree>
        </template>
    </sysDialog>
</template>

<script setup lang="ts">
import {DocumentRemove,Plus,Minus} from '@element-plus/icons'
import sysDialog from '@/components/sysDialog.vue';
import { useDialog } from '@/composables/department/useDialog';
import { useParent } from '@/composables/department/useParent'
const { dialogData, onClose, onshow } = useDialog()
const { treeData, getParentData, defaultProps, treeRef,openBtn,nodeClick ,selectNode} = useParent()
const emit=defineEmits(['select'])
const confirm = () => {
    emit('select',selectNode)
    onClose()
}
const show = async () => {
    await getParentData()
    dialogData.title = '上级部门'
    onshow()
}
defineExpose({
    show
})

</script>

<style scoped>
</style>