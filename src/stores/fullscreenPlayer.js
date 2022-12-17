import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFullscreenPlayerStore = defineStore('fullscreenPlayer', () => {
  const show = ref(false)
  return { show }
})
