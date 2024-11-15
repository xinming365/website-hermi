import { defineStore } from "pinia";

const useUserStore = defineStore("user", () => {
  //data
  const testPinia = "test";
  return { testPinia };
});

export default useUserStore;
