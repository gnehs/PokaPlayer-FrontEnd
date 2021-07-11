<template>
  <div class="update-notify" key="0" v-if="checkUpadteStatus">
    <h1>{{ $t('settings_update') }}</h1>
    <p>{{ checkUpadteStatus }}</p>

    <v-btn outlined to="/admin/system?update=true" color="white" dark>{{ $t('settings_update_go2UpdatePage') }}</v-btn>
  </div>
</template>
<style lang="sass" scoped>
.update-notify
  background: #2f2b3e
  text-shadow: 0 0 6px #2f2b3e
  position: relative
  margin: 16px 2px
  padding: 24px 32px
  border-radius: 16px
  background-size: 240px
  background-position: right
  background-repeat: no-repeat
  background-image: url('/img/update.svg')
  color: #FFF
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.3)
</style>
<script>
export default {
  name: 'poka-update',
  created() {
    this.axios
      .get(_setting(`server`) + '/status/')
      .then(res => res.data)
      .then(data => {
        let isAdmin = JSON.parse(sessionStorage.getItem('login')).role == 'admin' || false
        if (data.debug) this.debug = data.debug
        if (isAdmin) this.fetchNewVersion(data.version, isAdmin)
      })
  },
  data: () => ({ checkUpadteStatus: null, debug: null }),
  methods: {
    compareVersion(local, remote) {
      local = local.split('.').map(e => parseInt(e))
      remote = remote.split('.').map(e => parseInt(e))
      if (remote[0] > local[0]) {
        return true
      } else if (remote[1] > local[1]) {
        return true
      } else if (remote[2] > local[2]) {
        return true
      } else {
        return false
      }
    },
    async fetchNewVersion(currentVersion, isAdmin) {
      let storageId = `poka-github-check-${new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/')}`

      let githubRes = JSON.parse(sessionStorage[storageId] || null)
      if (!githubRes) {
        githubRes = await fetch('https://api.github.com/repos/gnehs/PokaPlayer/releases')
          .then(e => e.json())
          .then(e => {
            sessionStorage[storageId] = JSON.stringify(e)
            return e
          })
          .catch(e => console.error(e))
      }
      if (this.compareVersion(currentVersion, githubRes[0].tag_name) || this.debug) {
        this.checkUpadteStatus = i18n.t('settings_update_canUpdate2', {
          version: githubRes[0].tag_name
        })
        if (this.debug) this.checkUpadteStatus += ` (debug: ${this.debug})`
      }
    }
  }
}
</script>
