import { getUserInfoApi, loginApi } from "@/api/user";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useUserStore = defineStore(
  "userStore",
  () => {
    //modal
    const showLoginModal = ref(false);
    const isLogin = computed(() => !!token.value);
    //token
    const token = ref(null);
    const getToken = computed(() => token.value);
    function setToken(value) {
      token.value = value;
    }
    function clearToken() {
      token.value = null;
    }
    // userInfo
    const userInfo = ref(null);
    const getUserInfo = computed(() => userInfo.value);
    function setUserInfo(info) {
      userInfo.value = info;
    }
    function clearUserInfo() {
      userInfo.value = null;
    }

    async function login(userData) {
      const res = await loginApi(userData);
      if (res.data.token) {
        const token = res.data.token;
        setToken(token);
        return afterLogin();
      }
    }
    async function fetchUserInfo() {
      const res = await getUserInfoApi();
      return res.data;
    }
    async function afterLogin() {
      const userInfo = await fetchUserInfo();
      setUserInfo(userInfo);
      showLoginModal.value = false;
      return userInfo;
    }

    function logout() {
      clearToken();
      clearUserInfo();
      showLoginModal.value = false;
    }
    return {
      showLoginModal,
      isLogin,
      token,
      getToken,
      setToken,
      clearToken,
      userInfo,
      getUserInfo,
      setUserInfo,
      clearUserInfo,
      login,
      afterLogin,
      logout,
    };
  },
  {
    persist: true,
  }
);

export default useUserStore;
