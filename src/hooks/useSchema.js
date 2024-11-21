// 获取验证码
import { sendEmailCodeApi } from "@/api/user";
import { validateFn } from "@/utils/validate/validate";
import { ElMessage } from "element-plus";
import { ref } from "vue";
export function useSchema() {
  const buttonText = ref("发送验证码");
  const countdown = ref(60);
  const isSending = ref(false);
  const sendCode = async (account) => {
    const isPassPhone = validateFn("phone", account);
    const isPassEmail = validateFn("email", account);
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
      await sendEmailCodeApi({ email: account });
    } else {
      // todo 调用发送短信验证码的接口
    }
  };

  return {
    buttonText,
    sendCode,
    isSending,
  };
}
