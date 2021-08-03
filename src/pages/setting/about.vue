<template>
  <div>
    <div class="poka list">
      <div class="item" v-ripple>
        <div class="content">
          <v-icon class="bx mx-2">bx-info-circle</v-icon>
          <div class="header">
            <div class="head t-ellipsis">PokaPlayer</div>
            <div class="t-ellipsis">
              {{ poka_version }}
            </div>
          </div>
        </div>
      </div>
      <v-divider />
      <a class="item" v-ripple href="https://github.com/gnehs/PokaPlayer/" target="_blank">
        <div class="content">
          <v-icon class="bx mx-2">bxl-github</v-icon>
          <div class="header">
            <div class="head t-ellipsis">GitHub</div>
          </div>
        </div>
      </a>
      <a class="item" v-ripple href="https://github.com/gnehs/PokaPlayer/graphs/contributors" target="_blank">
        <div class="content">
          <v-icon class="bx mx-2">bx-user</v-icon>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings_about_contributions') }}</div>
          </div>
        </div>
      </a>
      <a class="item" v-ripple href="https://github.com/gnehs/PokaPlayer/issues" target="_blank">
        <div class="content">
          <v-icon class="bx mx-2">bx-error</v-icon>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings_about_errorEeport') }}</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    poka_version: 'Loading...'
  }),
  created() {
    this.axios.get(_setting(`server`) + '/status/').then(response => {
      if (!response.data.version) this.$router.push('/login')
      this.poka_version = response.data.version
    })
  }
}
</script> 