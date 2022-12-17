import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFullscreenPlayerStore = defineStore('fullscreenPlayer', () => {
  const show = ref(false)

  function toggle() {
    show.value = !show.value
  }

  return { show, toggle }
})
