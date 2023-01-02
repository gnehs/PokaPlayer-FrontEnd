<script setup>
import { ref, inject, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
const PokaAPI = inject('PokaAPI')
const logs = ref('')
const page = ref(0)
const end = ref(false)
const users = ref([])
async function getUserList() {
  let data = await PokaAPI.getUserList()
  users.value = data
}
async function getLogs(p = 0) {
  if (!users.value || !users.value.length) {
    await getUserList()
  }
  let res = await PokaAPI.getLog(p)
  for (let { level, type, event: _event, user, description, time } of res) {
    user = users.value.find(u => u._id == user)?.username || user
    time = new Date(time).toLocaleString()
    users.value.map(u => {
      description = description.replace(new RegExp(`{${u._id}}`, 'g'), u.username)
    })

    logs.value += `[${level}] ${type} / ${_event}\n`
    logs.value += `  📄 ${description}\n`
    logs.value += `  👤 ${user}\n`
    logs.value += `  🕒 ${time}\n`
    logs.value += `\n`
  }
  if (!res.length) {
    end.value = true
  }
}
// auto infinite scroll
const logBottom = ref(null)
const logBottomVisible = useIntersectionObserver(logBottom, async ([{ isIntersecting }], observerElement) => {
  if (isIntersecting) {
    await getLogs(page.value++)
  }
}, {
  threshold: 0.5,
  rootMargin: '0px',
})
onMounted(async () => {
  await getUserList()
  await getLogs()
})

</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.log.title') }}</p>
  </Teleport>
  <pre class="log" ref="logContainer">{{ logs }}</pre>
  <Loader ref="logBottom" v-if="!end" />
</template>
<style lang="sass" scoped>
pre.log
  overflow-x: auto
  padding: var(--padding)
  white-space: pre-wrap
  word-break: break-all
</style>