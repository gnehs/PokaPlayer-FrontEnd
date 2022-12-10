<template>
  <div>
    <Teleport to="#header-center">
      <p>媒體庫</p>
    </Teleport>
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