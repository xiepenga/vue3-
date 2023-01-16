<template>
    <el-form :inline="true" :model="SearchForm" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="SearchForm.SearchName" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :icon="Search" @click="searchBtn">搜索</el-button>
            <el-button size="mini" type='primary' :icon="Plus" @click="addDeptBtn">新增</el-button>
        </el-form-item>
    </el-form>
    <el-table
            :data="deptListData.list"
            style="width: 100%"
            row-key="id"
            default-expand-all
            size="medium"
            border
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="name" label="部门名称" />
            <el-table-column prop="deptCode" label="部门编码" />
            <el-table-column prop="deptPhone" label="部门电话" />
            <el-table-column width='200' align='center' label="操作">
                <template #default="scope">
                    <el-button size="mini" type='success' :icon="Edit" @click="editDeptBtn(scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        :icon='Close'
                        @click="deleteDeptBtn(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    <AddEditDialogVue ref="addEditRef" @save="save"></AddEditDialogVue>
</template>

<script setup lang="ts">
import { Search, Plus ,Close,Edit} from '@element-plus/icons-vue';
import { useDeptTable } from '@/composables/department/useDeptTable'
import AddEditDialogVue from './AddEditDialog.vue';
import {useDept} from '@/composables/department/UseDept'
const { SearchForm, deptListData, getdeptData } = useDeptTable()
const { addEditRef, addDeptBtn,editDeptBtn,searchBtn,deleteDeptBtn,save}=useDept( getdeptData)
</script>

<style scoped>
</style>