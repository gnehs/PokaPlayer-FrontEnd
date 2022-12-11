<template>
  <div class="login-container">
    <div class="login-form">
      <img class="logo" src="/img/icon.svg" alt="logo" />
      <h1>PokaPlayer</h1>
      <form @submit.prevent="login">
        <p-input :label="$t(`username`)" v-model="username" required />
        <p-input :label="$t(`password`)" v-model="password" type="password" required />
        <p-btn type="submit" block style="margin-top: calc(var(--padding) * 2);" color="primary">{{ $t(`login`) }}</p-btn>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginDialog',
  data() {
    return {
      username: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || '',
    }
  },
  methods: {
    async login() {
      let res = await this.$PokaAPI.login(this.username, this.password)
      if (res.success) {
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.login-container
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  background-color: var(--background-layer-2)
  .login-form
    display: flex
    flex-direction: column
    align-items: center
    background-color: var(--background-layer-1)
    padding: calc(var(--padding) * 2)
    border-radius: var(--border-radius)
    .logo
      --size: 72px
      width: var(--size)
      height: var(--size)
      margin-top: calc(-1 * var(--size) / 2)
    h1
      font-size: 24px
      text-align: left
      font-family: 'Product Sans', sans-serif
      margin-bottom: calc(var(--padding) * 4)
    form
      display: flex
      flex-direction: column
      align-items: center
      width: 400px
      max-width: calc(100vw - 80px)
</style>