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
      <p>{{ $t(`nav.library`) }}</p>
    </Teleport>
    <parse-home :items="home" v-if="home" />
    <Loader v-else />
  </div>
</template>