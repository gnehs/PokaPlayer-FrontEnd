<template>
  <div>
    <h1>資料庫</h1>
    Hi, {{ name }}
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
export default {

  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      name: this.userStore.userInfo.name
    }
  }
}
</script>