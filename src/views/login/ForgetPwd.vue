<template>
  <el-form
    ref="formRef"
    class="my-form enter-x"
    :model="forgetForm"
    label-width="100px"
    label-position="left"
    :rules="forgetRules"
  >
    <el-form-item label="账 号" prop="email" class="my-label">
      <el-input
        class="my-input"
        v-model="forgetForm.email"
        placeholder="请输入邮箱/手机号"
      ></el-input>
    </el-form-item>
    <el-form-item label="原密码" prop="current_password" class="my-label">
      <!-- 密码输入框 -->
      <el-input
        class="my-input"
        type="password"
        show-password
        v-model="forgetForm.current_password"
        placeholder="请输入原密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password" class="my-label">
      <!-- 密码输入框 -->
      <el-input
        class="my-input"
        type="password"
        show-password
        v-model="forgetForm.password"
        placeholder="请输入新密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="passwordConfirmation" class="my-label">
      <!-- 密码输入框 -->
      <el-input
        class="my-input"
        type="password"
        show-password
        v-model="forgetForm.passwordConfirmation"
        placeholder="请再次确认新密码"
      ></el-input>
    </el-form-item>
  </el-form>
  <div class="login-changePwd-back" @click="isForget = false">
    <a>返回</a>
  </div>
  <el-button class="my-button" round :loading="isChanging" @click="onChangePwd"
    >修 改</el-button
  >
</template>

<script setup lang="ts">
import { ref } from "vue";
import { changePwdApi } from "@/api/user";
const isForget = defineModel();

const formRef = ref();
const forgetForm = ref({
  email: "",
  current_password: "",
  password: "",
  passwordConfirmation: "",
});
const onResetFileds = async () => {
  await formRef.value.resetFields();
};
// 暴露登录表单数据
defineExpose({
  onResetFileds,
});

// 验证规则
const validateUser = (rule, value, callback) => {
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
const forgetRules = {
  email: [{ required: true, trigger: "change", validator: validateUser }],
  current_password: [
    { required: true, trigger: "change", message: "请输入原密码" },
  ],
  password: [{ required: true, trigger: "change", message: "请输入新密码" }],
  passwordConfirmation: [
    { required: true, trigger: "change", message: "请再次确认新密码" },
  ],
};

// 提交
const isChanging = ref(false);
const onChangePwd = () => {
  isChanging.value = true;
  try {
    formRef.value.validate(async (valid) => {
      if (!valid) return;
      console.log("验证通过");
      const res = await changePwdApi(forgetForm.value);
      console.log(res);
      if (res.status) {
        elMessage.success("修改成功,去登陆吧~");
        isForget.value = false;
      }
    });
  } catch (error) {
  } finally {
    isChanging.value = false;
  }
};
</script>

<style scoped lang="less"></style>
