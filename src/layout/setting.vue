<template>
  <div>
    <portal to="app-bar">
      <v-app-bar
        color="#FFF"
        clipped-left
        app
        :style="`box-shadow: 0px 0px 0px 1px ${$vuetify.theme.isDark ? 'rgba(255, 255, 255, 0.12)' : `rgb(0 0 0 / 20%)`}`"
      >
        <back icon to="/" />
        <v-toolbar-title>{{ $t('settings.title') }}</v-toolbar-title>
        <v-spacer />
        <menu-btn />
      </v-app-bar>
    </portal>
    <poka-header :title="$t('settings.title')" />
    <div class="chip-nav">
      <router-link
        class="chip-nav-item"
        :class="{ active: $route.path == item.to }"
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        v-ripple
      >
        <v-icon class="bx">{{ item.icon }}</v-icon>
        <span>{{ $t(item.text) }}</span>
      </router-link>
    </div>
    <transition name="fade" mode="out-in">
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
      { text: 'settings_network', icon: 'bx-server', to: '/settings/network' },
      { text: 'settingInterface._', icon: 'bx-extension', to: '/settings/interface' },
      { text: 'settingUser.title', icon: 'bx-user', to: '/settings/user' },
      { text: 'settingPins.title', icon: 'bx-pin', to: '/settings/pins' },
      { text: 'settings_about', icon: 'bx-info-circle', to: '/settings/about' }
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
