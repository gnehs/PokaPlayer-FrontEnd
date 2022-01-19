<template>
  <div>
    <v-subheader>{{ $t('settings.interface.lang') }}</v-subheader>
    <div class="poka list">
      <div class="item" @click="langDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-planet</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.interface.lang') }}</div>
            <div class="t-ellipsis">{{ $t('title', currentLang) }}</div>
          </div>
        </div>
      </div>
    </div>
    <v-subheader>{{ $t('settings.interface.customize.bg._') }}</v-subheader>
    <div class="poka list">
      <div class="item" @click="customizeBgDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-image</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.interface.customize.bg._') }}</div>
            <div class="t-ellipsis">{{ $t('settings.interface.customize.bg.description') }}</div>
          </div>
        </div>
      </div>
      <div class="item" @click="bgHeightDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-paint-roll</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.interface.customize.bg_cover._') }}</div>
            <div class="t-ellipsis">{{ $t('settings.interface.customize.bg_cover.description') }}</div>
          </div>
        </div>
      </div>
      <v-subheader>{{ $t('settings.interface.customize.theme') }}</v-subheader>
      <div class="item" @click="themeDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bxs-paint</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.interface.customize.theme_color._') }}</div>
            <div class="t-ellipsis">{{ $t('settings.interface.customize.theme_color.description') }}</div>
          </div>
        </div>
      </div>
      <div class="item" @click="themeSchemeDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bxs-color-fill</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">暗色主題配色方案</div>
            <div class="t-ellipsis">選擇暗色主題的配色方案，讓您的主題更為美觀。</div>
          </div>
        </div>
      </div>
      <div class="item" @click="lyricThemeDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-palette</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.interface.customize.lyric._') }}</div>
            <div class="t-ellipsis">{{ $t('settings.interface.customize.lyric.description') }}</div>
          </div>
        </div>
      </div>
      <v-subheader>{{ $t('settings.interface.customize.layout._') }}</v-subheader>
      <div class="item" @click="changeStyle('artist')" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">{{ view.artist == 'card' ? 'bx-grid-alt' : 'bx-list-ul' }}</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.interface.customize.layout.artist') }}</div>
            <div class="t-ellipsis">{{ $t('settings.interface.customize.layout.' + view.artist) }}</div>
          </div>
        </div>
      </div>
      <div class="item" @click="changeStyle('composer')" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">{{ view.composer == 'card' ? 'bx-grid-alt' : 'bx-list-ul' }}</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.interface.customize.layout.composer') }}</div>
            <div class="t-ellipsis">{{ $t('settings.interface.customize.layout.' + view.composer) }}</div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="bgHeightDialog" max-width="300">
      <v-card>
        <div class="dialog-title mb-2">{{ $t('settings.interface.customize.bg_cover._') }}</div>
        <v-card-text>
          <div class="poka list">
            <div class="item" @click="setBgHeight('full')" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bxs-star</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head">{{ $t('settings.interface.customize.bg_cover.options.full') }}</div>
                </div>
              </div>
            </div>
            <div class="item" @click="setBgHeight('half')" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bxs-star-half</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head">{{ $t('settings.interface.customize.bg_cover.options.half') }}</div>
                </div>
              </div>
            </div>
            <div class="item" @click="setBgHeight('none')" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bx-star</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head">{{ $t('settings.interface.customize.bg_cover.options.none') }}</div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="bgHeightDialog = false">{{ $t('back') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="customizeBgDialog" max-width="1200">
      <v-card>
        <div class="dialog-title mb-2">{{ $t('settings.interface.customize.bg._') }}</div>
        <v-card-text>
          <poka-cards>
            <poka-card
              @click.native="bgPromptActive = true"
              poka-icon="bx-link"
              :poka-title="$t('settings.interface.customize.bg.custom_link')"
            />
            <poka-card
              v-for="{ name, src } in imgSources"
              @click.native="setBg(src)"
              :key="src"
              :poka-bg="src"
              :poka-title="name"
            />
          </poka-cards>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="customizeBgDialog = false">{{ $t('done') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="themeDialog" max-width="340">
      <v-card>
        <div class="dialog-title mb-2">{{ $t('settings.interface.customize.theme_color._') }}</div>
        <v-card-text>
          <v-color-picker
            style="margin: 8px auto !important"
            flat
            mode="hex"
            v-model="color"
            class="ma-2"
            :swatches="swatches"
            show-swatches
          ></v-color-picker>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="themeDialog = false">{{ $t('done') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="bgPromptActive" max-width="420">
      <v-card>
        <div class="dialog-title mb-2">{{ $t('settings.interface.customize.bg._') }}</div>
        <v-card-text style="padding-bottom: 0">
          <v-text-field label="URL" v-model.trim="bgPromptTextbox" filled></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="bg_prompt_cancel">{{ $t('cancel') }}</v-btn>
          <v-btn text @click="bg_prompt_ok">{{ $t('ok') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="langDialog" max-width="300">
      <v-card>
        <div class="dialog-title mb-2">{{ $t('settings.interface.lang') }}</div>
        <v-card-text>
          <div class="poka list">
            <div
              class="item"
              v-for="(lang, index) of languages"
              :key="`lang${lang}-${index}`"
              @click="setLang(lang)"
              v-ripple
            >
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
          <v-btn text @click="langDialog = false">{{ $t('cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="lyricThemeDialog" max-width="300">
      <v-card>
        <div class="dialog-title mb-2">{{ $t('settings.interface.customize.lyric._') }}</div>
        <v-card-text>
          <div class="poka list">
            <div class="item" @click="setLyricTheme('bigtext')" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bx-palette</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head">Big text</div>
                </div>
              </div>
            </div>
            <div class="item" @click="setLyricTheme('default')" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bx-palette</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head">Default</div>
                </div>
              </div>
            </div>
            <div class="item" @click="setLyricTheme('spacing')" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bx-palette</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head">Spacing</div>
                </div>
              </div>
            </div>
            <div class="item" @click="setLyricTheme('underline')" v-ripple>
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon class="bx">bx-palette</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head">Underline</div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="lyricThemeDialog = false">{{ $t('cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="themeSchemeDialog" max-width="300">
      <v-card>
        <div class="dialog-title mb-2">暗色主題配色方案</div>
        <v-card-text>
          <div class="poka list">
            <div
              class="item"
              @click="setThemeScheme(item)"
              v-ripple
              v-for="item of themeSchemeList"
              :key="item"
              :color-scheme="item"
            >
              <div class="content">
                <v-avatar size="24px" item>
                  <v-icon
                    class="bx"
                    style="color: var(--surface1) !important; text-shadow: 0 0 1px #fff"
                  >bxs-circle</v-icon>
                </v-avatar>
                <v-avatar size="24px" item>
                  <v-icon
                    class="bx"
                    style="color: var(--surface2) !important; text-shadow: 0 0 1px #fff"
                  >bxs-circle</v-icon>
                </v-avatar>
                <v-avatar size="24px" item>
                  <v-icon
                    class="bx"
                    style="color: var(--surface3) !important; text-shadow: 0 0 1px #fff"
                  >bxs-circle</v-icon>
                </v-avatar>
                <div class="header">
                  <div class="head" style="text-transform: capitalize">{{ item }}</div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="themeSchemeDialog = false">{{ $t('cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SettingCustomize',
  data: () => ({
    // lang
    langDialog: false,
    languages: Object.keys(window.i18n.messages),
    currentLang: window.i18n.locale,
    //lyric theme
    lyricThemeDialog: false,
    // theme
    themeDialog: false,
    themeSchemeDialog: false,
    themeSchemeList: ['dark', 'dim', 'purple'],
    // bgheight
    bgHeightDialog: false,
    // style
    view: {
      artist: _setting(`artistView`),
      composer: _setting(`composerView`)
    },
    // custombg
    customizeBgDialog: false,
    bgPromptActive: false,
    bgPromptTextbox: window._setting('headerBgSource'),
    setting: { bg: window._setting('headerBgSource') },
    imgSources: [
      {
        name: 'LoremFlickr',
        src: 'https://loremflickr.com/1920/1080'
      },
      {
        name: 'Picsum Photos',
        src: 'https://picsum.photos/1920/1080/?random'
      },
      {
        name: 'Random Image API',
        src: 'https://random.imagecdn.app/v1/image?width=1920&height=1080'
      },
      {
        name: 'Bing',
        src: 'https://area.sinaapp.com/bingImg/'
      },
      {
        name: 'The Dog API (GIF)',
        src: 'https://api.thedogapi.com/v1/images/search?format=src&mime_types=image/gif'
      },
      {
        name: 'The Dog API (PNG)',
        src: 'https://api.thedogapi.com/v1/images/search?format=src&mime_types=image/png'
      },
      {
        name: 'The Cat API (GIF)',
        src: 'https://thecatapi.com/api/images/get?format=src&type=gif'
      },
      {
        name: 'The Cat API (PNG)',
        src: 'https://thecatapi.com/api/images/get?format=src&type=png'
      },
      {
        name: 'Unsplash Source',
        src: 'https://source.unsplash.com/random'
      },
      {
        name: 'Sword Art Online: Alicization',
        src: 'https://images2.imgbox.com/99/e2/knJdNcns_o.jpg'
      }
    ],
    swatches: [['#5c95c4', '#fc5185'], ['#824c96', '#107a8b'], ['#facf5a', '#000'], ['#fd0054'], ['#f96d00']]
  }),
  computed: {
    color: {
      get() {
        return window._setting('theme')
      },
      set(value) {
        this.setPrimaryColor(value)
      }
    }
  },
  watch: {
    'setting.bg': value => window._setting('headerBgSource', value)
  },
  methods: {
    setBg(bg) {
      this.setting.bg = bg
      //同步設定
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n: { headerBgSource: bg } }
      })
    },
    setBgHeight(h) {
      switch (h) {
        case 'full':
          window._CSSsetting('--pokabgheight', 'calc(var(--vh, 1vh) * 100 - 69px - 64px )')
          break
        case 'none':
          window._CSSsetting('--pokabgheight', '0px')
          break
        default:
          window._CSSsetting('--pokabgheight', '400px')
          break
      }
      //this.bgHeightDialog = false
      let cssVariable = window._setting('cssVariable')
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n: { cssVariable } }
      })
    },
    bg_prompt_cancel() {
      this.bgPromptActive = false
      this.bgPromptTextbox = window._setting('headerBgSource')
    },
    bg_prompt_ok() {
      this.bgPromptActive = false
      this.setBg(this.bgPromptTextbox)
    },
    setPrimaryColor(color) {
      this.$vuetify.theme.themes.dark.primary = color
      this.$vuetify.theme.themes.light.primary = color

      window._setting('theme', color)

      let theme = window._setting('theme')
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n: { theme } }
      })
    },
    setLang(lang) {
      window.i18n.locale = lang
      this.currentLang = lang
      window._setting('lang', lang)
      this.langDialog = false
      //同步設定
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n: { lang } }
      })
    },
    setLyricTheme(lyricTheme) {
      window._setting('lyricTheme', lyricTheme)
      this.lyricThemeDialog = false
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n: { lyricTheme } }
      })
    },
    setThemeScheme(scheme) {
      window._setting('color-scheme', scheme)

      let root = document.documentElement
      root.setAttribute('color-scheme', _setting('color-scheme'))

      document.getElementsByTagName('meta')['theme-color'].content = this.$vuetify.theme.isDark
        ? getComputedStyle(root)
          .getPropertyValue('--surface2')
          .trim()
        : 'rgb(245, 245, 245)'

      this.themeSchemeDialog = false
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n: { 'color-scheme': scheme } }
      })
    },
    changeStyle(name) {
      let value = this.view[name] == 'card' ? 'list' : 'card'

      let settingkey = name + 'View'
      _setting(settingkey, value)
      this.view[name] = value

      let n = {}
      n[settingkey] = value
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n }
      })
    }
  }
}
</script>
