<template>
  <div>
    <h1>登入</h1>
    {{ server }}
    <form @submit.prevent="login">
      <p-input label="server" v-model="server" />
      <p-input label="username" v-model="username" />
      <p-input label="password" v-model="password" type="password" />
      <p-btn type="submit">Login</p-btn>
    </form>
  </div>
</template>
<script>
export default {
  name: 'LoginDialog',
  data() {
    return {
      server: localStorage.getItem('server') || '',
      username: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || '',
    }
  },
  methods: {
    async login() {
      let res = await this.$PokaAPI.login(this.server, this.username, this.password)
      if (res.success) {
        this.$router.push('/')
      }
    }
  }
}
</script>