<template>
  <div>
    <div class="poka list">
      <v-subheader>{{ $t('settings_system') }}</v-subheader>
      <div class="item" @click="restartConfirmActive = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon>autorenew</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings_restart') }}</div>
          </div>
        </div>
      </div>
      <div class="item" @click="openUpdateDialog" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon>system_update</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings_update') }}</div>
            <div class="t-ellipsis">
              {{ checkUpadteStatus }}
              <span v-if="poka_debug">(debug: {{ poka_debug }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="restartConfirmActive" max-width="420">
      <v-card>
        <v-card-title class="headline">{{ $t('settings_restartDialog_title') }}</v-card-title>
        <v-card-text style="padding-bottom: 0">
          <p>{{ $t('settings_updateDialog_note') }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="restartConfirmActive = false">{{ $t('cancel') }}</v-btn>
          <v-btn
            text
            @click="
              restartConfirmActive = false
              restart()
            "
            color="primary"
            >{{ $t('ok') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showUpdateDialog" max-width="512">
      <v-card>
        <div class="update-container">
          <div class="release-note">
            <div class="title">{{ $t('settings_updateDialog_title', { version: newVersion.tag }) }}</div>
            <p class="changelog mb-0" v-html="newVersion.body" />
          </div>
          <div class="actions">
            <v-spacer />
            <p>{{ $t('settings_updateDialog_note') }}</p>
            <p v-if="poka_debug" v-html="$t('settings_updateDialog_note_dev')" />
            <v-btn
              @click="
                showUpdateDialog = false
                update()
              "
              block
              large
              depressed
              color="primary"
              >{{ $t('settings_update') }}
            </v-btn>
            <v-btn @click="showUpdateDialog = false" text block class="mt-1" outlined>{{ $t('cancel') }}</v-btn>
            <v-btn href="https://github.com/gnehs/PokaPlayer/releases" target="_blank" text block outlined class="mt-1">{{
              $t('settings_updateDialog_view_previous')
            }}</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showUpdateingDialog" persistent max-width="280">
      <v-card>
        <v-card-text style="padding: 0">
          <pre class="log" style="width: 280px; height: 200px">{{ updateLog }}</pre>
          <v-progress-linear indeterminate color="primary" v-show="!showRestartCompleted"></v-progress-linear>
        </v-card-text>
        <v-card-actions v-show="showRestartCompleted">
          <v-spacer />
          <v-btn text color="primary" @click="reload">{{ $t('settings_update_reconnect') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRestartingDialog" persistent max-width="280">
      <v-card>
        <br />
        <p v-show="!showRestartCompleted" class="headline text-center font-weight-bold">
          {{ $t('settings_restarting') }}
        </p>
        <p v-show="showRestartCompleted" class="headline text-center font-weight-bold">
          {{ $t('settings_restart_completed') }}
        </p>
        <poka-loader v-show="!showRestartCompleted" />
        <br />
        <v-card-actions v-show="showRestartCompleted">
          <v-spacer />
          <v-btn text color="primary" @click="reload">{{ $t('settings_update_reconnect') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SettingSystem',
  data: () => ({
    checkUpadteStatus: i18n.t('settings_update_checking4updates'),
    restartConfirmActive: false,
    showUpdateDialog: false,
    showUpdateingDialog: false,
    showRestartingDialog: false,
    showRestartCompleted: false,
    updateLog: '',
    poka_version: null,
    poka_debug: null,
    newVersion: {
      prerelease: null,
      tag: null,
      body: 'Loading...'
    }
  }),
  created() {
    this.axios.get(_setting(`server`) + '/status/').then(response => {
      this.poka_version = response.data.version
      this.poka_debug = response.data.debug != 'false' ? response.data.debug : null
      this.fetchNewVersion()
    })
  },
  methods: {
    openUpdateDialog() {
      if (this.poka_debug || this.newVersion.tag) this.showUpdateDialog = true
    },
    fetchNewVersion() {
      fetch('https://api.github.com/repos/gnehs/PokaPlayer/releases')
        .then(e => e.json())
        .then(e => {
          this.newVersion.body = new showdown.Converter().makeHtml(e[0].body)
          if (this.compareVersion(this.poka_version, e[0].tag_name)) {
            this.newVersion.prerelease = e[0].prerelease
            this.newVersion.tag = e[0].tag_name
            this.checkUpadteStatus = i18n.t('settings_update_update2', { version: this.newVersion.tag })
            if (this.$route.query.update) {
              this.showUpdateDialog = true
            }
          } else {
            this.checkUpadteStatus = i18n.t('settings_update_latestVersion')
          }
        })
        .catch(e => console.error(e))
    },
    update() {
      window._player.pause()
      this.showUpdateingDialog = true
      this.updateLog += this.$t('settings_update_update2', { version: this.newVersion.tag }) + '\n'

      _socket.emit('login', {
        username: window._setting(`username`),
        password: window._setting(`password`)
      })
      _socket.emit('update')

      window._socket.on('Permission Denied Desu', () => {
        this.showUpdateingDialog = false
        alert('Permission Denied')
      })
      window._socket.on('init', () => {
        this.updateLog += this.$t('settings_update_initializing') + '\n'
      })
      window._socket.on('git', data => {
        this.updateLog +=
          {
            fetch: this.$t('settings_update_git_fetch'),
            reset: this.$t('settings_update_git_reset'),
            api: this.$t('settings_update_git_api')
          }[data] + '\n'
      })
      window._socket.on('restart', () => {
        this.updateLog += this.$t('settings_restarting') + '...\n'
      })
      window._socket.on('hello', () => {
        this.showRestartCompleted = true
      })
      window._socket.on('err', async data => {
        const delay = interval => {
          return new Promise(resolve => {
            setTimeout(resolve, interval)
          })
        }
        this.updateLog += `[ERROR] ${data}`
        await delay(1000)
        this.showUpdateingDialog = false
      })
    },
    restart() {
      window._player.pause()
      this.showRestartingDialog = true
      this.axios.post('/restart')
      window._socket.on('hello', () => {
        this.showRestartCompleted = true
      })
    },
    reload() {
      window.location.reload()
    },
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
    }
  }
}
</script>
<style lang="sass">
pre.log
  background: #000
  padding: 5px
  overflow: auto
  max-width: 100%
  font-family: 'Ubuntu Mono', monospace
  color: #FFF
  white-space: pre-wrap
</style>
<style lang="sass">
.update-container
  background-color: rgba(0,0,0,.05)
  .release-note
    .title
      font-size: 24px !important
      padding: 16px
      padding-top: 64px
  .actions
    padding: 16px
    p
      font-size: 12px
      opacity: .5

.changelog
  padding: 16px
  color: #000
  background-color: #fff
  line-height: 1.8em
  font-size: 12px
  h1,h2,h3,h4,h5,h6
    font-size: 18px
    margin: .2em 0
  h1
    font-size: 24px
  h2
    font-size: 20px
  img
    max-width: 90%
    display: block
    margin: 0 auto
  hr
    border: 0
    height: 0
    border-top: 1px solid rgba(0, 0, 0, 0.1)
    border-bottom: 1px solid rgba(255, 255, 255, 0.3)
  code
    font-family: 'Ubuntu Mono', monospace
  li
    opacity: .75
@media (prefers-color-scheme: dark)
  .changelog
    background-color: rgba(255, 255, 255, 0.04)
    color: #FFF
</style>
