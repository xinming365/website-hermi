<template>
  <div class="header">
    <div v-if="isLogin">
      <span style="margin: 0 5px">【{{ userInfo?.username }}】</span>
      <span class="header-logout" @click="userStore.logout">退出登录</span>
    </div>

    <template v-else>
      <div class="header-register" @click="handleClick(1)">注册丨</div>
      <div class="header-login" @click="handleClick(0)">登录</div>
    </template>
  </div>
  <!-- <el-dialog
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
  </el-dialog> -->

  <el-dialog
    modal-class="my-dialog"
    v-model="showLoginModal"
    :before-close="onBeforeClose"
    width="800"
  >
    <div class="modal-wrap">
      <div class="modal-left">
        <div class="login-tit">
          <span>{{ dialogTitle }}</span>
        </div>
        <RegisterForm
          v-if="isRegisterDialog"
          ref="registerRef"
          :toggleModal="handleClick"
        />
        <LoginForm v-else ref="loginRef" />
      </div>
      <div class="modal-right">
        <div class="modal-greet"></div>
        <div class="modal-deer"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import RegisterForm from "./RegisterForm.vue";
import LoginForm from "./LoginForm.vue";
import { ref, computed } from "vue";
import useUserStore from "@/store/modules/user";
import { storeToRefs } from "pinia";
//
const userStore = useUserStore();
const { showLoginModal, isLogin, userInfo } = storeToRefs(userStore);

//
const isRegisterDialog = ref(false);
const dialogTitle = computed(() =>
  isRegisterDialog.value ? "注 册" : "登 录"
);
const onBeforeClose = async (done) => {
  console.log("出发了close");
  isRegisterDialog.value
    ? await registerRef.value.onResetFileds()
    : await loginRef.value.onResetFileds();
  done();
};
const handleClick = (status?: number) => {
  console.log(status);
  status ? (isRegisterDialog.value = true) : (isRegisterDialog.value = false);
  console.log("isRegisterDialog", isRegisterDialog.value);
  showLoginModal.value = true;
};

// 提交
const loginRef = ref(null);
const registerRef = ref(null);

window.addEventListener("beforeunload", (e) => {
  userStore.showLoginModal = false;
});
</script>

<style scoped lang="less">
.header {
  background-color: #0c1824d9;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  padding-right: 20em; /* 添加右侧内边距 */
}

.header-register,
.header-login,
.header-logout {
  /* margin-left: 20px; 添加按钮之间的间距 */
  cursor: pointer; /* 鼠标悬停时显示为手型 */
  &:hover {
    color: #f55;
  }
}

/* .header-register:hover, .header-login:hover {
  /* text-decoration: underline;  /*鼠标悬停时添加下划线 */

// .dialog-footer {
//   padding-bottom: 20px;
//   text-align: center;
// }
// .dialog-footer .el-button {
//   width: 70%;
// }
</style>

<style lang="less">
.my-dialog {
  .el-dialog {
    padding: 0;
    .el-dialog__header {
      padding: 0;
    }
  }
  .modal-wrap {
    display: flex;
    justify-content: space-between;
    .modal-left {
      // width: 450px;
      // margin: 0 auto;
      flex: 1;
      padding: 80px 60px;
      .login-tit {
        width: 100%;
        height: 30px;
        line-height: 26px;
        text-align: center;
        position: relative;
        > span {
          font-size: 20px;
          color: #363636;
          font-weight: bold;
          position: relative;
          padding: 0 15px;
          background: #fff;
        }
        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 1px;
          top: 15px;
          background: #e5e5e5;
        }
      }
    }
    .modal-right {
      width: 260px;
      overflow: hidden;
      background-color: #fff3e2;
      .modal-greet {
        width: 145px;
        height: 70px;
        margin-left: 30px;
        margin-top: 100px;
        background-repeat: no-repeat;
        background-image: url("@/assets/images/greet-login.png");
      }
      .modal-deer {
        width: 200px;
        height: 225px;
        margin-left: 120px;
        background-repeat: no-repeat;
        background-image: url("@/assets/images/deer.png");
      }
    }
  }
}
</style>
