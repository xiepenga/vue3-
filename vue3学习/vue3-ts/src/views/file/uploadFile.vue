<template>
    <div id="uploadFile">
        <input type="file"  ref="fileRef"   @change="handleChange"/>
        <el-progress :percentage="percentage" />
        <el-button @click="uploadFile">点击上传</el-button>
    </div>
</template>

<script setup lang="ts">
import { useUploadFile } from "@/composables/file/useUploadFile";
const {handleChange,fileRef,uploadFile,percentage}=useUploadFile()

</script>

<style scoped>
    #uploadFile{
        width: 200px;
    }
</style>