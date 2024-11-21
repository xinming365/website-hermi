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
      >
        <template #append>
          <el-button
            style="border: 1px solid #ccc"
            @click="sendCode(forgetForm.email)"
            :disabled="isSending"
            >{{ buttonText }}</el-button
          >
        </template>
      </el-input>
    </el-form-item>
    <!-- 手机验证码 -->
    <el-form-item class="my-label" label="验证码" prop="code">
      <el-input
        class="my-input"
        v-model.trim="forgetForm.code"
        placeholder="请输入邮箱/手机验证码"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword" class="my-label">
      <!-- 密码输入框 -->
      <el-input
        class="my-input"
        type="password"
        show-password
        v-model="forgetForm.newPassword"
        placeholder="请输入新密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword" class="my-label">
      <!-- 密码输入框 -->
      <el-input
        class="my-input"
        type="password"
        show-password
        v-model="forgetForm.confirmPassword"
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
import { useSchema } from "@/hooks/useSchema";
import { ElMessage } from "element-plus";
const isForget = defineModel();

const formRef = ref();
const forgetForm = ref({
  email: "",
  code: "",
  newPassword: "",
  confirmPassword: "",
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
  code: [{ required: true, trigger: "change", message: "验证码不能为空" }],
  newPassword: [{ required: true, trigger: "change", message: "请输入新密码" }],
  confirmPassword: [
    { required: true, trigger: "change", message: "请再次确认新密码" },
  ],
};
// 验证码
const { buttonText, sendCode, isSending } = useSchema();
// 提交
const isChanging = ref(false);
const onChangePwd = () => {
  isChanging.value = true;
  try {
    formRef.value.validate(async (valid) => {
      if (!valid) return;
      console.log("验证通过");
      resetPwd();
    });
  } catch (error) {
  } finally {
    isChanging.value = false;
  }
};
const resetPwd = async () => {
  const res = await changePwdApi(forgetForm.value);
  console.log(res);
  if (res.status) {
    ElMessage.success("修改成功,去登陆吧~");
    isForget.value = false;
  }
};
</script>

<style scoped lang="less"></style>
