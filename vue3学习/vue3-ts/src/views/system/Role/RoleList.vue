<template>
    <div class="file">
        <input type="file" @change="handleFileChange"/>
        <el-button @click="handleUpload">点击上传</el-button>
    </div>
</template>

<script setup lang="ts">
import { fileFormdata } from '@/api/formdata/fromdata';
import { reactive } from 'vue';
interface Container{
    file:File|null,
    data:{
        chunk:File,
        hash:string
    }[]
}
 const container=reactive<Container>({
    file:null,
    data:[]
 })
 const SIZE=10*1024*1024
function handleFileChange(e:any){
    const [file]=e.target.files
    if(!file)return
    container.file=file
    console.log(container.file)
}
async function handleUpload(){
    if(!container.file)return
    const fileChunkList:File[]=createFileChunk(container.file)as File[]
    container.data=fileChunkList.map((file,index)=>({
       chunk:file,
       hash:container.file!.name +'-'+index
    }))
    console.log(container.data)
    await uploadChunks()
}
function createFileChunk(file:File,size=SIZE){
    const fileChunkList=[]
    let cur =0
    while(cur<file.size){
        fileChunkList.push(file.slice(cur,cur+size))
        cur+=size
    }
    console.log(fileChunkList,1111)
    return fileChunkList
}
async function  uploadChunks(){
    const requestList=container.data.map(({chunk,hash})=>{
        const formdata=new FormData()
        formdata.append('chunk',chunk)
        formdata.append('hash',hash)
        formdata.append('filename', container.file?.name as any)
        return {formdata}
    }).map(({formdata})=>{
        
        fileFormdata(formdata)
    })
    await Promise.all(requestList)
}

</script>

<style scoped>
    .file{
        
        margin: 200px 0 0 0;
        text-align: left;
    }
</style>