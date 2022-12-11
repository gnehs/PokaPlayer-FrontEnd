<script setup>
import { ref, inject, onMounted } from 'vue'
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()
// const name = reactive(userStore.userInfo.name)
const PokaAPI = inject('PokaAPI')
const home = ref(null)
onMounted(async () => {
  home.value = await PokaAPI.getHome()
})
</script>
<template>
  <div>
    <Teleport to="#header-center">
      <p>媒體庫</p>
    </Teleport>
    <parse-home :items="home" />
  </div>
</template>