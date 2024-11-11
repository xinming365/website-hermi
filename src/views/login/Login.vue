<template>
  <div class="header">
    <div class="header-register" @click="handleClick(1)">注册丨</div>
    <div class="header-login" @click="handleClick(0)">登录</div>
  </div>
  <el-dialog
    class="dialog"
    :close-on-click-modal="false"
    :title="dialogTitle"
    v-model="showDialog"
    @closed="isRegisterDialog = false"
    width="30%"
  >
    <RegisterForm ref="registerRef" v-if="isRegisterDialog" />
    <LoginForm ref="loginRef" v-else />
    <div class="dialog-footer">
      <el-button type="primary" round @click="handleSubmit">{{
        dialogTitle
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import RegisterForm from "./RegisterForm.vue";
import LoginForm from "./LoginForm.vue";
import { ref, computed } from "vue";

const isRegisterDialog = ref(false);
const showDialog = ref(false);
const dialogTitle = computed(() => (isRegisterDialog.value ? "注册" : "登录"));

const handleClick = (status?: number) => {
  console.log(status);
  status ? (isRegisterDialog.value = true) : (isRegisterDialog.value = false);
  console.log("isRegisterDialog", isRegisterDialog.value);

  showDialog.value = true;
};

// 提交
const loginRef = ref(null);
const registerRef = ref(null);
const handleSubmit = () => {
  const params = isRegisterDialog.value
    ? registerRef.value.registerForm
    : loginRef.value.loginForm;
  console.log("表单数据", params);
};
</script>

<style scoped>
.header {
  background-color: #0c1824d9;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  padding-bottom: 20px;
  text-align: center;
}
.dialog-footer .el-button {
  width: 70%;
}
</style>
