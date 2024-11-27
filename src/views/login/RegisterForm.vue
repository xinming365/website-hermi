<template>
  <!-- 注册表单 -->
  <el-form
    class="my-form"
    ref="formRef"
    :model="registerForm"
    label-width="100px"
    label-position="left"
    :rules="registerRules"
  >
    <el-form-item class="my-label" label="账号" prop="phone">
      <el-input
        class="my-input"
        v-model="registerForm.phone"
        placeholder="请输入邮箱/手机号"
      >
        <template #append>
          <el-button
            style="border: 1px solid #ccc"
            @click="sendCode"
            :disabled="isSending"
            >{{ buttonText }}</el-button
          >
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="my-label" label="昵 称" prop="nickname">
      <el-input
        class="my-input"
        v-model="registerForm.nickname"
        placeholder="请输入昵称"
      ></el-input>
    </el-form-item>
    <el-form-item class="my-label" label="验证码" prop="code">
      <el-input
        class="my-input"
        v-model.trim="registerForm.code"
        placeholder="请输入邮箱/手机验证码"
      ></el-input>
    </el-form-item>

    <el-form-item class="my-label" label="密 码" prop="password">
      <el-input
        class="my-input"
        type="password"
        show-password
        v-model="registerForm.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item class="my-label" label="确认密码" prop="submitPassword">
      <el-input
        class="my-input"
        type="password"
        show-password
        v-model="registerForm.submitPassword"
        placeholder="请再次确认密码"
      ></el-input>
    </el-form-item>

    <el-form-item class="my-label" label="邀请码" prop="inviteCode">
      <el-input
        class="my-input"
        v-model="registerForm.inviteCode"
        placeholder="请输入邀请码[选填]"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <input type="checkbox" v-model="registerForm.isAgree" />
      <div class="dialog-agree">
        我已阅读并同意<el-button key="primary" type="primary" text
          >《用户协议》</el-button
        >
      </div>
    </el-form-item>
    <el-button class="my-button" round :loading="isRegist" @click="onRegister"
      >注 册</el-button
    >
  </el-form>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import { ref } from "vue";
import useUserStore from "@/store/modules/user";
import { validateFn, getType } from "@/utils/validate/validate";
import { sendEmailCodeApi, verfyCodeApi, registerApi } from "@/api/user";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  toggleModal: Function,
});
const emit = defineEmits(["update:visible"]);

const formRef = ref();
const registerForm = ref({
  nickname: "",
  phone: "",
  code: "",
  inviteCode: "",
  isAgree: false,
  password: "",
  submitPassword: "",
});
const onResetFileds = async () => {
  await formRef.value.resetFields();
};
defineExpose({
  onResetFileds,
});
// 不为空校验
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
const registerRules = ref({
  // nickname: [{ required: true, message: "请输入昵称", trigger: "change" }],
  phone: [
    {
      required: true,
      validator: validatePhone,
      trigger: "change",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "change" }],
  password: [{ required: true, message: "密码不能为空", trigger: "change" }],
  submitPassword: [
    { required: true, message: "密码不能为空", trigger: "change" },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
});
// 验证码
const countdown = ref(60);
const isSending = ref(false);
const buttonText = ref("发送验证码");
const userStore = useUserStore();
const sendCode = async () => {
  const isPassPhone = validateFn("phone", registerForm.value.phone);
  const isPassEmail = validateFn("email", registerForm.value.phone);
  // 校验
  if (!isPassPhone && !isPassEmail)
    return ElMessage.error("请输入正确的邮箱/手机号");

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

  if (isPassEmail) {
    // todo 调用发送email验证码的接口
    await sendEmailCodeApi({ email: registerForm.value.phone });
  } else {
    // todo 调用发送短信验证码的接口
  }
};

// 提交
const isRegist = ref(false);
const onRegister = () => {
  isRegist.value = true;
  try {
    formRef.value.validate(async (valid) => {
      if (!valid) return;
      console.log("验证通过");
      if (!registerForm.value.isAgree) {
        return ElMessage.error("请先同意用户协议");
      }
      // todo:注册逻辑
      validateCode() && registUser(getType(registerForm.value.phone));
    });
  } catch (e) {
    console.log(e);
  } finally {
    isRegist.value = false;
  }
};
const validateCode = async () => {
  const res = await verfyCodeApi({
    email: registerForm.value.phone,
    code: registerForm.value.code,
  });
  return res.success ? true : false;
};

//type  "email" || "phone"
const registUser = async (type = "email") => {
  const params = {
    nickname: registerForm.value.nickname,
    password: registerForm.value.password,
  };
  params[type] = registerForm.value.phone;
  const res = await registerApi(params);
  console.log(res);
  userStore.showLoginModal = false;
  if (res.status) {
    ElMessageBox.confirm("注册成功，现在去登录吧?", "Confirm", {
      distinguishCancelAndClose: true,
      confirmButtonText: "去登录~",
      cancelButtonText: "暂时不了",
    }).then(() => {
      userStore.showLoginModal = true;
      onResetFileds();
      props.toggleModal(0);
    });
  }
};
</script>

<style scoped lang="less">
.dialog-agree {
  margin-left: 6px;
  display: flex;
  align-items: center;
}
.my-label {
  margin: 0 auto 10px;
  padding: 5px 0px;
}
</style>
