<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
const PokaAPI = inject('PokaAPI')
const logs = ref([])
const loading = ref(true)
const page = ref(0)
const end = ref(false)

async function getLogs() {
  loading.value = true
  let res = await PokaAPI.getLog(page.value)
  logs.value = logs.value.concat(res)
  if (!res.length) {
    end.value = true
  }
  loading.value = false
}

// auto infinite scroll
const logBottom = ref(null)
const logBottomVisible = useIntersectionObserver(logBottom, async ([{ isIntersecting }], observerElement) => {
  if (isIntersecting) {
    page.value++
    await getLogs()
  }
}, {
  threshold: 0.5,
  rootMargin: '0px',
})
onMounted(async () => {
  await getLogs()
})

</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.log.title') }}</p>
  </Teleport>
  <pre ref="logContainer">{{ logs }}</pre>
  <Loader ref="logBottom" v-if="!end" />
</template>