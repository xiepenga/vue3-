<template>
    <sysDialog :title="dialogData.title" :visible="dialogData.visible" :height="dialogData.height"
        :width="dialogData.width" @onClose="onClose" @confirm="confirm">
        <template v-slot:content>
            <el-form :model="dialogModel" ref="addDeptForm" :rules="rules" label-width="80px" size="small">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="parentName" label="上级部门">
                            <el-input type="hidden" v-model="dialogModel.pid"></el-input>
                            <el-input @click="selectParent" v-model="dialogModel.parentName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="name" label="部门名称">
                            <el-input v-model="dialogModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="deptCode" label="部门编码">
                            <el-input v-model="dialogModel.deptCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="deptPhone" label="部门电话">
                            <el-input v-model="dialogModel.deptPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="manager" label="部门经理">
                            <el-input v-model="dialogModel.manager"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="deptAddress" label="部门地址">
                            <el-input v-model="dialogModel.deptAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="orderNum" label="部门序号">
                            <el-input v-model="dialogModel.orderNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
    </sysDialog>
    <Parent ref="parentRef" @select="select"></Parent>
</template>

<script setup lang="ts">
import sysDialog from '@/components/sysDialog.vue';
import { useDialog } from '@/composables/department/useDialog'
import { useBaseModel } from '@/composables/department/useBaseModel';
import { EditType, Title } from '@/type/baseEnum';
import { useSelectParent } from '@/composables/department/useSelectParent';
import Parent from './parent.vue';
import {useInstance} from '@/utils/useInstance'
import { AddDeptModel } from '@/api/dept/deptModel';
import { nextTick } from 'vue';
const { dialogModel, addDeptForm, rules, select } = useBaseModel()
const { dialogData, onClose, onshow } = useDialog()

const {global}=useInstance()
const show = (type: EditType,row?:AddDeptModel) => {
       addDeptForm.value?.resetFields()
    if(type==EditType.ADD){
        dialogData.title = Title.ADD
    }else{
        dialogData.title = Title.EDIT
        nextTick(()=>{
            global.$objCoppy(row,dialogModel)
        })
    }
    dialogModel.type = type
    onshow()
}
const emit = defineEmits(['save'])
const confirm = () => {
    addDeptForm.value?.validate((isvalid) => {
        if (isvalid) {
            emit('save', dialogModel)
            addDeptForm.value?.resetFields()
            onClose()
        }
    })

}
defineExpose({
    show
})
const { selectParent, parentRef } = useSelectParent()
</script>

<style scoped>
</style>