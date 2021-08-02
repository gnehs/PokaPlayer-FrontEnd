<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon class="bx">bx-dots-vertical-rounded</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-icon>
            <v-icon class="bx" v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'menu-btn',
  data: () => ({
    items: [{ icon: 'bx-cog', text: 'settings', to: '/settings' }]
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

      // add admin page
      if (userProfile.data.role == 'admin') {
        let debugItem = {
          icon: 'bx-server',
          text: 'settingIndex.adminItems',
          to: '/admin'
        }
        if (!this.items.filter(x => x.text == 'settingIndex.adminItems').length) {
          this.items.push(debugItem)
        }
      }
      // add debug page
      if (response.data.debug) {
        let debugItem = { icon: 'bx-bug', text: 'debug', to: '/debug' }
        if (!this.items.filter(x => x.text == 'debug').length) {
          this.items.push(debugItem)
        }
      }
    }
  }
}
</script>

<style>
</style>