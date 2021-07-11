<template>
  <div>
    <poka-header :title="$t('settings')" />
    <div class="chip-nav">
      <router-link class="chip-nav-item" :class="{ active: $route.path == item.to }" v-for="item in items" :key="item.to" :to="item.to" v-ripple>
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
    items: [
      { text: 'settings_network', icon: 'wifi', to: '/settings/network' },
      { text: 'settingInterface._', icon: 'layers', to: '/settings/interface' },
      { text: 'settingUser.title', icon: 'person', to: '/settings/user' },
      { text: 'settingPins.title', icon: 'push_pin', to: '/settings/pins' }
    ]
  }),
  created() {
    this.getStatus()
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
