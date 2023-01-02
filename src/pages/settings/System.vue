<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
const PokaAPI = inject('PokaAPI')
const socket = inject('socket')
const systemInfo = ref(null)
const latestVersion = ref(null)
const updateDialog = ref(false)
const updateLogDialog = ref(false)
const updateLog = ref(`Updating...`)
const isNewUpdateAvailable = computed(() => {
  if (systemInfo.value && latestVersion.value) {
    return systemInfo.value.version != latestVersion.value.tag_name
  }
  return false
})
async function getSystemInfo() {
  const res = await PokaAPI.getSystemInfo()
  systemInfo.value = res
}
async function updateSystemVersion() {
  updateDialog.value = false
  updateLogDialog.value = true

  socket.emit('update')

  socket.on('Permission Denied Desu', () => {
    updateLogDialog.value = false
    alert('Permission Denied')
  })
  socket.on('init', () => {
    updateLog.value = 'Initializing...'
  })
  socket.on('git', data => {
    updateLog.value =
      {
        fetch: `Fetching...`,
        reset: `Resetting...`,
        package_updated: `Package updated...`,
      }[data]
  })
  socket.on('restart', () => {
    updateLog.value = `Restarting...`
  })
  socket.on('hello', () => {
    updateLog.value = `System updated!`
    setTimeout(() => {
      location.reload()
    }, 1000)
  })
  socket.on('err', async data => {
    const delay = interval => {
      return new Promise(resolve => {
        setTimeout(resolve, interval)
      })
    }
    updateLog.value = `An error occurred, please check console.`
    console.error(data)
    await delay(1000)
    updateLogDialog.value = false
  })
}
async function restartSystem() {
  let confirm = window.confirm('Are you sure you want to restart the system?')
  if (!confirm) return
  socket.emit('restart')

  updateLogDialog.value = true
  updateLog.value = `Loading...`
  socket.on('restart', () => {
    updateLog.value = `Restarting...`
  })
  socket.on('hello', () => {
    updateLog.value = `System restarted!`
    setTimeout(() => {
      location.reload()
    }, 1000)
  })
  socket.on('err', async data => {
    const delay = interval => {
      return new Promise(resolve => {
        setTimeout(resolve, interval)
      })
    }
    updateLog.value = `An error occurred, please check console.`
    console.error(data)
    await delay(1000)
    updateLogDialog.value = false
  })
}
async function checkUpdate() {
  await getSystemInfo()
  let { debug } = systemInfo.value
  let releases = await fetch('https://api.github.com/repos/gnehs/PokaPlayer/releases').then(e => e.json())
  latestVersion.value = releases.filter(e => debug || !e.prerelease)[0]
}
function notAvailable() {
  alert('Not available yet')
}
onMounted(async () => {
  socket.emit('echo', { 'world': 'hello' })
  socket.on('echo', (data) => {
    console.log('echo', data)
  })
  await checkUpdate()
})

</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.system.title') }}</p>
  </Teleport>
  <p-list-items single-row>
    <p-list-item tabindex="0" @click="notAvailable">
      <p-list-item-icon-btn>
        <i class='bx bx-edit'></i>
      </p-list-item-icon-btn>
      <p-list-item-content
        title="Edit config" />
    </p-list-item>
    <p-list-item tabindex="0" @click="restartSystem">
      <p-list-item-icon-btn>
        <i class='bx bx-revision'></i>
      </p-list-item-icon-btn>
      <p-list-item-content
        title="Restart" />
    </p-list-item>
    <p-list-item tabindex="0" @click="isNewUpdateAvailable && (updateDialog = true)">
      <p-list-item-icon-btn>
        <i class='bx bx-cloud-upload'></i>
      </p-list-item-icon-btn>
      <p-list-item-content
        title="Update PokaPlayer"
        :description="latestVersion ? isNewUpdateAvailable ? 'New update available' : 'Up to date' : 'Loading...'" />
    </p-list-item>
  </p-list-items>
  <Dialog v-model="updateDialog">
    <h2>Update PokaPlayer to {{ latestVersion.tag_name }}</h2>
    <p style="margin: var(--padding) 0;">{{ latestVersion.body }}</p>
    <p style="margin: var(--padding) 0;">Release date: {{ new Date(latestVersion.published_at).toLocaleString() }}</p>
    <p-btn :href="latestVersion.html_url" target="_blank" rel="noopener noreferrer" outlined>View release</p-btn>
    <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);gap: var(--padding);">
      <p-btn @click="updateDialog = false" outlined>Cancel</p-btn>
      <p-btn @click="updateSystemVersion" color="primary">Update</p-btn>
    </div>
  </Dialog>
  <Dialog v-model="updateLogDialog" :closeable="false">
    <Loader style="margin: calc(var(--padding) * 4) 0;" />
    <p style="margin: var(--padding) 0;text-align: center;">{{ updateLog }}</p>
  </Dialog>
</template>