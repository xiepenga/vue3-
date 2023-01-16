<template>
    <el-dialog v-model="visible" :title="title" :width="width+'px'" :before-close="onClose">
           <div class="container" :style="{ height: height + 'px' }">
      <slot name="content"></slot>
    </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onClose">Cancel</el-button>
                <el-button type="primary" @click="confirm">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: ''
    },
    visible: {
        type: Boolean,
        default: false
    },
    width: {
        type: Number,
        default: 600,
    },
    height: {
        type: Number,
        default: 250,
    }
})
const emit=defineEmits(['onClose','confirm'])
const onClose=()=>{
    emit('onClose')
}
const confirm=()=>{
    emit('confirm')
}
</script>

<style scoped lang="scss">
.container {
  overflow-x: initial;
  overflow-y: auto;
}
.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;
    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 10px;
  }
  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>