
<template>
    <div class="login">
        <el-form class="login-form" 
        :model="loginFormData" 
        style="max-width: 460px"
        ref="loginFormRef"
        :rules="rules"
        >
            <el-form-item>
                <div class="system">系统登陆</div>
            </el-form-item>
            <el-form-item prop="username">
                <el-input placeholder="请输入账号" v-model="loginFormData.username" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="loginFormData.password" />
            </el-form-item>
            <el-form-item prop="code">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-input placeholder="请输入验证码" v-model="loginFormData.code" />
                    </el-col>
                    <el-col :span="6">
                        <img :src="imageSrc" @click="getImage">
                    </el-col>
                </el-row>

            </el-form-item>
            <el-form-item >
                <el-row class="mybtn" style="margin-top:20px" :gutter="20">
                    <el-col :span="12">
                        <el-button class="mybtn" type="primary" @click="login">登陆</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button class="mybtn" @click="resetFrom">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import{userImage} from '@/composables/login/user'
import {userBaseLogin} from '@/composables/login/userBaseLogin'
import {userLogin}from '@/composables/login/userLogin'
let {imageSrc,getImage}=userImage()
let {loginFormData,loginFormRef,rules}=userBaseLogin()
let {login,resetFrom}=userLogin(loginFormData)
</script>

<style scoped lang="scss">
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
        height: 320px;
        width: 400px;
        border-radius: 10px;
        padding: 20px 35px;
        box-shadow: 0 0 25px #cac6c6;


            .system {
                width: 100%;
                font-size: 24px;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
            }


        .mybtn {
            width: 100%;
        }
    }
}
</style>