<template>
  <div v-if="!isForget" class="enter-x">
    <!-- 表单 -->
    <el-form
      ref="formRef"
      class="my-form"
      :model="loginForm"
      label-width="70px"
      label-position="left"
      :rules="loginRules"
    >
      <!-- 手机号表单项 -->
      <el-form-item label="账 号" prop="phone" class="my-label">
        <!-- 输入框 -->
        <el-input
          class="my-input"
          v-model="loginForm.phone"
          placeholder="请输入邮箱/手机号"
        ></el-input>
      </el-form-item>
      <!-- 密码表单项 -->
      <el-form-item label="密 码" prop="password" class="my-label">
        <!-- 密码输入框 -->
        <el-input
          class="my-input"
          type="password"
          show-password
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- @click="handleSubmit" -->
      <div class="login-changePwd-back">
        <a style="margin-right: 10px" @click="goRegist">去注册</a>
        <a @click="isForget = true">忘记密码?</a>
      </div>
      <el-button class="my-button" round :loading="isLogin" @click="onLogin"
        >登 录</el-button
      >
    </el-form>
  </div>

  <ForgetPwd v-else v-model="isForget" ref="changePwdRef" />
</template>

<script setup>
import useUserStore from "@/store/modules/user";
import ForgetPwd from "./ForgetPwd.vue";
import { ElNotification } from "element-plus";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const props = defineProps({
  toggleModal: Function,
});
// 定义登录表单数据
const formRef = ref();
const changePwdRef = ref();
const loginForm = ref({
  phone: "",
  password: "",
});
const onResetFileds = async () => {
  isForget.value
    ? await changePwdRef.value.onResetFileds()
    : await formRef.value.resetFields();
};
const isChangePwdState = computed(() => isForget.value);
// 暴露登录表单数据
defineExpose({
  onResetFileds,
  isChangePwdState,
});

// 定义登录表单验证规则
const validatePhone = (rule, value, callback) => {
  const phoneNumberRegex = /^1[3456789]\d{9}$/;
  const regEmailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (!value) {
    return callback(new Error("请输入邮箱/手机号"));
  }
  if (!phoneNumberRegex.test(value) && !regEmailRegex.test(value)) {
    return callback(new Error("请输入正确的邮箱/手机格式"));
  } else {
    callback();
  }
};
const loginRules = ref({
  phone: [
    {
      required: true,
      validator: validatePhone,
      trigger: "change",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});
const isLogin = ref(false);
const onLogin = () => {
  isLogin.value = true;
  try {
    formRef.value.validate(async (valid) => {
      if (valid) {
        // todo:登录逻辑
        console.log("验证通过");
        const userInfo = await userStore.login({
          login: loginForm.value.phone,
          password: loginForm.value.password,
        });
        console.log("userinfo", userInfo);
        if (userInfo) {
          onResetFileds();
          router.go(0);
          ElNotification({
            title: "success",
            message: `欢迎~~${userInfo.nickname}`,
            duration: 3000,
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLogin.value = false;
  }
};

// 切换忘记密码
const isForget = ref(false);

const goRegist = () => {
  onResetFileds();
  props.toggleModal(1);
};
</script>

<style scoped lang="less"></style>
