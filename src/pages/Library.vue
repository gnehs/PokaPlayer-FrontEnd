<template>
  <div>
    <poka-header title="媒體庫" />
    <library-menu />
    <poka-update />
    <poka-loader v-if="!data" />
    <v-slide-y-reverse-transition>
      <poka-parse-home v-if="data" :data="data" />
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
export default {
  name: 'Home',
  async created() {
    try {
      let { data } = await this.axios.get(
        `${_setting('server')}/pokaapi/home/?${Math.random()
          .toString(36)
          .substring(7)}`
      )
      this.data = data
      this.name = JSON.parse(sessionStorage.login).name
    } catch (e) {
      this.$router.push('/login')
    }
  },
  data: () => ({
    data: null,
    name: null
  })
}
</script>

<style></style>
