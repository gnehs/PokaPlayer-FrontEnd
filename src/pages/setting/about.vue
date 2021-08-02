<template>
  <div>
    <v-list subheader>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="bx">bx-info-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>PokaPlayer</v-list-item-title>
          <v-list-item-subtitle>{{ poka_version }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item href="https://github.com/gnehs/PokaPlayer/" target="_blank">
        <v-list-item-avatar>
          <v-icon class="bx">bxl-github</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>GitHub</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="https://github.com/gnehs/PokaPlayer/graphs/contributors" target="_blank">
        <v-list-item-avatar>
          <v-icon class="bx">bx-user</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('settings_about_contributions') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="https://github.com/gnehs/PokaPlayer/issues" target="_blank">
        <v-list-item-avatar>
          <v-icon class="bx">bx-error</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('settings_about_errorEeport') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
<style lang="sass" scoped>
.version
    .version-number
        font-size: 1.5em
    .version-description
</style>