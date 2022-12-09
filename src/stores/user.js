import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})

  function setUserInfo(info) {
    userInfo.value = info
  }

  return { userInfo, setUserInfo }
})
