<template>
  <el-tabs
    v-model="activetab"
    type="card"
    closable
    class="demo-tabs"
    @tab-remove="removeTabs"
    @tab-click="tabClick"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.name"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { computed, Ref, ref,watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/index';
const route=useRoute();
const router=useRouter()
const stroe=useStore()
const activetab  = ref('')
const tabs=computed(()=>{
  return stroe.state.tabs.tabs
})
watch(()=>route.path,()=>{
    stroe.commit('tabs/addTabs',{name:route.meta.title as string,path:route.path});
    activetab.value=route.path as string;
},{immediate:true})

const tabClick=(tab:any)=>{
const {props}=tab
  router.push({path:props.name})
}
const beforeUnload=()=>{
  window.addEventListener('unload',()=>{
    sessionStorage.setItem('tabs',JSON.stringify(stroe.state.tabs.tabs))
  })
  const sessionTabs=sessionStorage.getItem('tabs');
  if(sessionTabs){
    stroe.commit('tabs/includesTabs',JSON.parse(sessionTabs))
  }
}
beforeUnload()
const removeTabs = (targetName: string) => {
    if(tabs.value.length==1&&targetName=="/dashboard")return;
    const tabList = tabs.value
    let activeName = activetab.value
    if (activeName === targetName) {
      tabList.forEach((tab, index) => {
        if (tab.path === targetName) {
          const nextTab = tabList[index + 1] || tabList[index - 1]
          if (nextTab) {
            activeName = nextTab.path
          }
        }
      })
    }

    activetab.value = activeName
    stroe.commit('tabs/removeTabs',targetName)
    if(tabs.value.length<=0){
        router.push({path:"/dashboard"})
    }else{
      router.push({path:activeName})
    }
  }


</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  margin: 0px;
  height: 26px !important;
}
:deep(.el-tabs__item) {
  height: 26px !important;
  line-height: 26px!important;
  text-align: center!important;
  border: 1px solid #d8dce5 !important;
  margin: 0px 3px 0 0!important;
  color: #495060;
  font-size: 12px!important;
  padding: 0xp 10px!important;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #42b983 !important;
  background-color: #42b983 !important;
  color: #fff !important;
}
:deep(.el-tabs__item:hover) {
  color: #495060 !important;
}
:deep(.is-active:hover) {
  color: #fff !important;
}
</style>