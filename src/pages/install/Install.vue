<template>
  <div class="install-container" :style="{ '--bg': `url('${bg}')` }">
    <v-overlay absolute :value="logining">
      <poka-loader />
    </v-overlay>
    <div class="logo">
      <img src="/img/icons/icon.png" />
    </div>
    <div class="install-form">
      <div class="form-container" v-show="step == 1">
        <h1>{{ $t('install.title') }}</h1>
        <p class="text-center">{{ $t('install.description') }}</p>
        <div class="poka list">
          <div
            class="item"
            :class="{ 'active': lang == currentLang }"
            v-for="(lang, index) of languages"
            :key="`lang${lang}-${index}`"
            @click="setLang(lang)"
            v-ripple
          >
            <div class="content">
              <v-avatar size="24px" item>
                <v-icon class="bx" v-if="lang == currentLang">bx-check</v-icon>
                <v-icon class="bx" v-else></v-icon>
              </v-avatar>
              <div class="header">
                <div class="head t-ellipsis">{{ $t('title', lang) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-center mt-8">
          <v-btn
            rounded
            large
            color="primary"
            width="110px"
            @click="step = 2"
          >{{ $t('install.next') }}</v-btn>
        </div>
      </div>
      <div class="form-container" v-show="step == 2">
        <h1>{{ $t('install.database.title') }}</h1>
        <p class="text-center">{{ $t('install.database.description') }}</p>
        <v-text-field
          v-model="db_uri"
          label="URI"
          :rules="[v => !!v]"
          required
          prepend-icon="bx-data"
        />
        <div class="d-flex justify-center mt-8">
          <v-btn rounded large color="primary" width="110px" @click="done">{{ $t('install.next') }}</v-btn>
        </div>
        <div class="d-flex justify-center mt-8">
          <v-btn
            text
            href="https://docs.mongodb.com/manual/reference/connection-string/"
            target="_blank"
          >
            <v-icon class="bx">bx-help-circle</v-icon>
            {{ $t('install.database.help') }}
          </v-btn>
        </div>
      </div>
      <div class="form-container" v-show="step == 3">
        <h1>{{ $t('install.init.title') }}</h1>
        <p class="text-center">{{ $t('install.init.description') }}</p>
        <poka-loader />
      </div>
      <div class="form-container" v-show="step == 4">
        <h1>{{ $t('install.done.title') }}</h1>
        <p class="text-center">{{ $t('install.done.description') }}</p>
        <div class="d-flex justify-center mt-8">
          <v-btn rounded large color="primary" width="110px" to="/login">{{ $t('login') }}</v-btn>
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- <div class="left-btns">
        <v-btn class="mx-1" @click="lang_dialog = true" depressed fab small>
          <v-icon class="bx">bx-planet</v-icon>
        </v-btn>
      </div>-->
      <div class="right-btns">
        <v-btn href="https://github.com/gnehs/PokaPlayer" target="_blank" depressed fab small>
          <v-icon class="bx">bxl-github</v-icon>
        </v-btn>
      </div>
    </div>
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
<style lang="scss">
.install-container {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: var(--bg, rgb(242, 242, 242));
  background-color: antiquewhite;
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
  .install-form,
  .footer {
    background: var(--bg-color);
  }
  .install-form {
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
  .install-container {
    .install-form {
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
  .install-container {
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
    // change lang 
    languages: Object.keys(window.i18n.messages),
    currentLang: i18n.locale,
    step: 1,
    db_uri: '',
  }),
  created() {
  },
  methods: {
    setLang(lang) {
      window.i18n.locale = lang
      this.currentLang = lang
      window._setting('lang', lang)
      this.lang_dialog = false
    },
    done() {
      this.step = 3
      setTimeout(() => {
        this.bg = "/img/done.svg"
        this.step = 4
      }, 2000)

    },
  }
}
</script>
