<template>
  <div>
    <poka-header :title="$t(`settingIndex.adminItems`)" />
    <div class="chip-nav">
      <router-link class="chip-nav-item" :class="{ active: $route.path == item.to }" v-for="item in adminItems" :key="item.to" :to="item.to" v-ripple>
        <v-icon class="material-icons-outlined">{{ item.icon }}</v-icon>
        <span>{{ $t(item.text) }}</span>
      </router-link>
    </div>
    <transition name="fade" mode="out-in" v-on:enter="pageEnter">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data: () => ({
    settings: { darkMode: window._setting('darkMode') },
    adminItems: [
      {
        text: 'settings_systemAndUpdate',
        icon: 'system_update',
        to: '/admin/system'
      },
      {
        text: 'settingUserManagement.title',
        icon: 'person',
        to: '/admin/users'
      },
      { text: 'adminLog.title', icon: 'receipt_long', to: '/admin/log' }
    ]
  }),
  created() {
    this.getStatus()
    this.isAdmin = JSON.parse(sessionStorage.getItem('login')).role == 'admin' || false
  },
  methods: {
    async getStatus() {
      // getStatus
      let response = await this.axios.get(_setting(`server`) + '/status/')
      // 沒登入滾回登入頁面
      if (!response.data.login) return this.$router.push('/login')
      // 標記為已登入
      let userProfile = await this.axios.get(_setting(`server`) + '/pokaapi/v2/user/')
      sessionStorage.setItem('login', JSON.stringify(userProfile.data))
      // sync settings
      let settings = JSON.parse(userProfile.data.settings)
      for (let i of Object.keys(settings)) {
        _setting(i, settings[i])
      }
    }
  }
}
</script>
