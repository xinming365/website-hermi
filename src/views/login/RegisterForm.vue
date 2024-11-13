<template>
  <!-- 注册表单 -->
  <el-form :model="registerForm" :rules="registerRules" label-width="100px">
    <!-- 昵称 -->
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="registerForm.nickname"></el-input>
    </el-form-item>
    <!-- 手机号 -->
    <el-form-item label="手机号" prop="phone">
      <el-input type="tel" maxlength="11" v-model="registerForm.phone">
        <template #append>
          <!-- 发送验证码按钮 -->
          <el-button @click="sendCode" :disabled="isSending">{{
            buttonText
          }}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <!-- 手机验证码 -->
    <el-form-item label="手机验证码" prop="code">
      <el-input v-model="registerForm.code"></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        show-password
        v-model="registerForm.password"
      ></el-input>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="submitPassword">
      <el-input
        type="password"
        show-password
        v-model="registerForm.submitPassword"
      ></el-input>
    </el-form-item>
    <!-- 邀请码 -->
    <el-form-item label="邀请码" prop="inviteCode">
      <el-input v-model="registerForm.inviteCode"></el-input>
    </el-form-item>
    <!-- 同意协议 -->
    <el-form-item>
      <input type="checkbox" />
      <div class="dialog-agree">
        我已阅读并同意<el-button key="primary" type="primary" text
          >《用户协议》</el-button
        >
      </div>
    </el-form-item>
  </el-form>
  
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, computed } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:visible"]);

const registerForm = ref({
  nickname: "",
  phone: "",
  code: "",
  inviteCode: "",
  isAgree: false,
  password: "",
  submitPassword: "",
});
// 不为空校验
const registerRules = ref({
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  code: [{ required: true, message: "请输入手机验证码", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  submitPassword: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
// 发送验证码
const countdown = ref(60);
const isSending = ref(false);
const buttonText = ref("发送验证码");
const sendCode = () => {
  // 校验手机号码
  if (!/^1\d{10}$/.test(registerForm.value.phone)) {
    ElMessage.error("请输入正确格式手机号");
    return;
  }
  // 处理发送验证码的逻辑
  isSending.value = true;
  buttonText.value = `重新发送(${countdown.value}s)`;
  const timer = setInterval(() => {
    countdown.value--;
    buttonText.value = `重新发送(${countdown.value}s)`;
    if (countdown.value === 0) {
      clearInterval(timer);
      isSending.value = false;
      buttonText.value = "重新发送";
      countdown.value = 60;
    }
  }, 1000);
};


defineExpose({
  registerForm,
})

// 提交注册
const handleRegister = () => {};
</script>

<style scoped>
.dialog-agree {
  margin-left: 6px;
  display: flex;
  align-items: center;
}

</style>
