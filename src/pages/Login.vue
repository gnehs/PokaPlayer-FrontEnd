<template>
  <div class="login-container" :style="{ '--bg': `url('${bg}')` }">
    <v-overlay absolute :value="logining">
      <poka-loader />
    </v-overlay>
    <div class="logo">
      <img src="/img/icons/icon.png" />
    </div>
    <div class="login-form">
      <form class="form-container" @submit.prevent="login">
        <h1>{{ $t('header_welcome') }}</h1>
        <v-text-field class="rounded-input" outlined :label="$t('login_page.server')" v-model.trim="server" :disabled="logining" />
        <v-text-field class="rounded-input" outlined :label="$t('login_page.username')" v-model="username" :disabled="logining" />
        <v-text-field
          class="rounded-input"
          outlined
          :label="$t('login_page.password')"
          type="password"
          v-model="password"
          :disabled="logining"
        />
        <div class="d-flex justify-center">
          <v-btn :disabled="logining" rounded large color="primary" type="submit" width="110px">{{ $t('login') }}</v-btn>
        </div>
      </form>
    </div>
    <div class="footer">
      <div class="left-btns">
        <v-btn class="mx-1" @click="lang_dialog = true" depressed fab small>
          <v-icon class="bx">bx-planet</v-icon>
        </v-btn>
        <v-btn class="mx-1" @click="clearSessionDialog = true" depressed fab small>
          <v-icon class="bx">bx-bolt-circle</v-icon>
        </v-btn>
      </div>
      <div class="right-btns">
        <v-btn href="https://github.com/gnehs/PokaPlayer" target="_blank" depressed fab small>
          <v-icon class="bx">bxl-github</v-icon>
        </v-btn>
      </div>
    </div>

    <v-dialog v-model="lang_dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ $t('settingInterface.lang') }}</v-card-title>
        <v-card-text>
          <div class="poka list">
            <div class="item" v-for="(lang, index) of languages" :key="`lang${lang}-${index}`" @click="setLang(lang)" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bx-planet</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head t-ellipsis">{{ $t('title', lang) }}</div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="lang_dialog = false">{{ $t('cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="clearSessionDialog" max-width="420">
      <v-card>
        <v-card-title class="headline">{{ $t('login_page.session._') }}</v-card-title>
        <v-card-text>
          <p>{{ $t('login_page.session.description') }}</p>
          <p>{{ $t('login_page.session.description2') }}</p>
          <v-text-field outlined :label="$t('login_page.server')" v-model.trim="server" :disabled="logining"></v-text-field>
          <v-text-field outlined :label="$t('login_page.username')" v-model="username" :disabled="logining"></v-text-field>
          <v-text-field outlined :label="$t('login_page.password')" type="password" v-model="password" :disabled="logining"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="clearSessionDialog = false">{{ $t('cancel') }}</v-btn>
          <v-btn color="red" text @click="clearSession">{{ $t('reset') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss">
  .v-text-field--outlined.rounded-input {
    border-radius: 100em;
    .v-input__slot {
      padding: 0 24px !important;
    }
    fieldset {
      padding-left: 19px !important;
    }
  }
</style>
<style lang="scss" scoped>
  .login-container {
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    display: flex;
    flex-direction: column;
    background: var(--bg, rgb(242, 242, 242));
    background-size: cover;
    background-position: center;
    --bg-color: #fff;
    .logo {
      padding: 8px 12px;
      width: 100%;
      img {
        width: 40px;
      }
    }
    .login-form,
    .footer {
      background: var(--bg-color);
    }
    .login-form {
      flex: 1;
      border-radius: 48px 0 0 0;
      .form-container {
        width: 350px;
        margin: 0 auto;
        padding: 72px 32px;
        border-radius: 32px;
        h1 {
          text-align: center;
          margin: 24px 0;
        }
      }
    }
    .footer {
      width: 100vw;
      align-content: center;
      display: flex;
      .left-btns {
        padding: 8px;
        align-self: center;
      }
      .right-btns {
        flex: 1;
        padding: 8px;
        text-align: right;
        align-self: center;
      }
    }
  }

  @media (min-width: 768px) {
    .login-container {
      .login-form {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        .form-container {
          background: var(--bg-color);
        }
      }
      .footer {
        background: transparent;
      }
    }
  }
  @media (prefers-color-scheme: dark) {
    .login-container {
      --bg-color: #282535;
    }
  }
</style>
<script>
export default {
  name: 'Login',
  data: () => ({
    logining: false,
    bg: _setting(`headerBgSource`),
    server: null,
    password: null,
    username: null,
    // clear session
    clearSessionDialog: false,
    // change lang
    lang_dialog: false,
    languages: Object.keys(window.i18n.messages),
    currentLang: i18n.locale
  }),
  created() {
    this.password = _setting(`password`)
    this.username = _setting(`username`)
    this.server = _setting(`server`)
  },
  methods: {
    setLang(lang) {
      window.i18n.locale = lang
      this.currentLang = lang
      window._setting('lang', lang)
      this.lang_dialog = false
    },
    async login() {
      this.server = this.server.replace(/\/$/, '') // remove last "/"
      if (!this.password || !this.server || !this.username) {
        return this.$snackbar('Please fill in all fields')
      }
      this.logining = true
      let response
      try {
        await this.axios.get(this.server + '/logout/')
        response = await this.axios({
          method: 'post',
          url: this.server + '/login/',
          data: { password: this.password, username: this.username }
        }).then(res => res.data)
      } catch (error) {
        this.$snackbar(this.$t('requestError'))
      }
      this.logining = false
      if (response.success) {
        _setting(`password`, this.password)
        _setting(`username`, this.username)
        _setting(`server`, this.server)
        // 同步設定
        let settingReq = (await this.axios(this.server + '/pokaapi/v2/user/setting/')).data
        for (let i of Object.keys(settingReq.settings)) {
          _setting(i, settingReq.settings[i])
        }
        // 轉到首頁
        this.$router.push('/')
        //重新整理來啟用新設定值
        window.location.reload()
      } else {
        this.logining = false
        this.$snackbar('Wrong password')
        this.password = ''
        return false
      }
    },
    async clearSession() {
      this.clearSessionDialog = false
      let clrres = await this.axios({
        method: 'post',
        url: this.server + '/clear-session/',
        data: { password: this.password, username: this.username },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
      if (clrres.data.success) {
        this.$snackbar(i18n.t('login_page.session.success'))
      } else {
        this.$snackbar(i18n.t('login_page.session.fail') + clrres.data.e)
      }
    }
  }
}
</script>
