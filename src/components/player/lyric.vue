<template>
  <div :theme="lyric_theme">
    <portal to="fullscreen-player-action">
      <div class="action">
        <v-btn dark icon @click="editLyric">
          <v-icon class="bx">bx-edit</v-icon>
        </v-btn>
        <v-btn dark icon @click="lyric_theme_dialog = true">
          <v-icon class="bx">bx-palette</v-icon>
        </v-btn>
        <v-btn icon @click="$router.go(-1)" dark large v-show="$vuetify.breakpoint.mdAndUp">
          <v-icon class="bx">bx-chevron-down</v-icon>
        </v-btn>
      </div>
    </portal>
    <div v-on:dblclick="openLyricDialog">
      <div
        v-if="lyric.length > 1"
        class="lyric"
        key="lyric"
        :class="{ lyricTranslated: lyricTranslated }"
      >
        <div style="height: 200px" />
        <p
          v-for="(item, index) of lyric"
          :key="index"
          :data-lyric-set="lyricTranslated ? Math.floor((index - lyricFocus) / 2) : index - lyricFocus"
          :class="{
            focus: index == lyricFocus,
            tl: lyricTranslated ? Math.floor((index - lyricFocus) / 2) != Math.round((index - lyricFocus) / 2) : false
          }"
        >
          <span>{{ item.text }}</span>
        </p>
        <div style="height: 200px" />
      </div>
      <poka-loader v-else-if="lyricSearching" style="margin-top: 30vh !important" color="#fff" />
      <div v-else class="text-center" style="margin-top: 30vh">
        <v-icon class="bx bx-lg mb-2" dark>bx-captions</v-icon>
        <p class="headline">{{ $t('lrc_noLyrics') }}</p>
        <v-btn color="primary" @click="showLyricDialog = true">{{ $t('lrc_search') }}</v-btn>
      </div>
    </div>
    <v-card class="save-current-lyric mx-auto blur-card" max-width="400" v-if="lyric_save_toast">
      <v-card-title>歌詞正確嗎？</v-card-title>
      <v-card-text>按下「儲存」讓下次也會載入相同的歌詞。</v-card-text>
      <v-card-actions>
        <v-btn text @click="lyric_save_toast = false">取消</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="saveCurrentLyric">儲存</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="showLyricDialog" max-width="420">
      <v-card>
        <v-card-title class="headline">{{ $t('lrc_search') }}</v-card-title>
        <v-card-text style="padding-bottom: 0">
          <v-text-field
            :label="$t('lrc_search')"
            name="searchLyric"
            v-model.trim="lyricSearchkeyword"
            :disabled="lyricSearching"
            @keyup.enter="getLyricByKeyword()"
            @change="getLyricByKeyword()"
            solo
          ></v-text-field>
          <p style="margin-top: -22px">
            <small>{{ $t('lrc_enter2search') }}</small>
          </p>
        </v-card-text>
        <v-divider />
        <v-card-text style="max-height: 400px; overflow: scroll; overflow-x: hidden">
          <div class="poka list" style="width: 372px">
            <div
              class="item"
              @click="
  loadLrc(`[00:00.000]`, true)
                showLyricDialog = false
              "
              v-ripple
            >
              <div class="content">
                <div class="header">
                  <div class="head t-ellipsis">{{ $t('lrc_notLoad') }}</div>
                  <div class="t-ellipsis">{{ $t('lrc_notLoad_description') }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="poka list" v-if="!lyricSearching && lyricSearchResult" style="width: 100%">
            <div
              class="item"
              v-for="(item, index) of lyricSearchResult"
              :key="index"
              @click="
  loadLrc(item.lyric, true)
                showLyricDialog = false
              "
              v-ripple
            >
              <div class="content">
                <div class="header">
                  <div class="head t-ellipsis">{{ item.name }}</div>
                  <div class="t-ellipsis">{{ item.artist }} ({{ $t('source.' + item.source) }})</div>
                </div>
              </div>
            </div>
          </div>
          <poka-loader v-else-if="lyricSearching" />
          <div style="text-align: center; padding: 40px 0" v-else>
            <v-btn @click="dialogSearch" color="primary">{{ $t('search') }}</v-btn>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showLyricDialog = false">{{ $t('cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="lyric_theme_dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ $t('settingInterface.customize.lyric._') }}</v-card-title>
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
          <v-btn text @click="lyric_theme_dialog = false">{{ $t('cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'player-lyric',
  data: () => ({
    audio_title: null,
    audio_artist: null,
    audio_cover: null,
    showLyricDialog: false,
    lyric_theme_dialog: false,
    lyric: [],
    lyric_raw: null,
    lyricFocus: 0,
    lyricSearching: true,
    lyricSearchResult: null,
    lyricTranslated: false,
    lyricSearchkeyword: null,
    Lyric_Update: null,
    lyric_color: null,
    lyric_shadow_color: null,
    lyric_theme: _setting('lyricTheme'),
    lyric_save_toast: false
  }),
  created() {
    this.updateLyric()
    this.startUpdateLyric()
  },
  destroyed() {
    this.stopUpdateLyric()
  },
  methods: {
    editLyric() {
      window.localStorage['lrc_temp'] = this.lyric_raw
      this.$router.push('/lyric/edit')
    },
    startUpdateLyric() {
      this.Lyric_Update = setInterval(() => this.updateLyric(), 300)
    },
    stopUpdateLyric() {
      if (this.Lyric_Update) {
        clearInterval(this.Lyric_Update)
      }
    },
    openLyricDialog() {
      this.showLyricDialog = true
      this.lyricSearchkeyword = this.audio_title + ' ' + this.audio_artist
    },
    dialogSearch() {
      this.getLyricByKeyword(this.lyricSearchkeyword, false) //搜尋一下
    },
    focusLyric() {
      this.$nextTick(() => {
        //等 Vue 好了再去更新捲動條
        let focusedLyric = document.querySelector('.lyric [data-lyric-set="0"].focus')
        if (focusedLyric) {
          focusedLyric.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        } else {
          this.lyricFocus = 0
        }
      })
    },
    updateLyric() {
      let nowPlaying = _player.list.audios[_player.list.index]
      if (_player.list.audios.length > 0) {
        if (this.audio_title != nowPlaying.name) {
          //找歌詞囉
          window._lrc.load(`[00:00.000]`)
          this.lyric = window._lrc.getLyrics()
          this.lyricFocus = 0
          this.lyric_save_toast = false
          this.lyricSearching = true
          this.lyricSearchResult = null
          this.lyricSearchkeyword = nowPlaying.name + ' ' + nowPlaying.artist
          this.getLyric(nowPlaying.name, nowPlaying.artist, nowPlaying.id, nowPlaying.source)
          this.audio_title = nowPlaying.name
          this.audio_artist = nowPlaying.artist
          this.audio_cover = nowPlaying.cover
        } else {
          //更新時間就好
          if (this.lyric.length > 1) {
            let lyricFocus_temp = window._lrc.select(_player.audio.currentTime)
            if (this.lyricFocus != lyricFocus_temp) {
              this.lyricFocus = lyricFocus_temp
              this.focusLyric()
            }
          }
        }
      } else {
        this.noloadedLyric = true
        this.lyricSearching = false
      }
    },
    getLyric(title, artist, id = false, source) {
      let lyricRegex = /\[([0-9.:]*)\]/i
      let url
      if (id) {
        url =
          _setting(`server`) +
          `/pokaapi/lyric/?moduleName=${encodeURIComponent(source)}&id=${encodeURIComponent(id)}&time=${new Date().getTime()}`

        this.axios(url).then(response => {
          if (response.data.lyrics.length && response.data.lyrics[0].lyric.match(lyricRegex)) {
            if (title == this.audio_title) {
              //透過 id 找到歌詞ㄌ
              this.loadLrc(response.data.lyrics[0].lyric)
            }
          } else {
            //沒找到，拿 title 跟 artist 找找看
            this.getLyricByKeyword(this.lyricSearchkeyword)
          }
        })
      } else {
        this.getLyricByKeyword(this.lyricSearchkeyword)
      }
    },
    getLyricByKeyword(keyword, set = true) {
      if (!keyword) keyword = this.lyricSearchkeyword
      this.lyricSearching = true
      this.axios(_setting(`server`) + `/pokaapi/searchLyrics/?keyword=${encodeURIComponent(keyword)}`)
        .then(result => result.data)
        .then(result => {
          if (result.lyrics.length > 0) {
            if (keyword == this.lyricSearchkeyword) {
              this.loadLrc(result.lyrics[0].lyric)
              this.lyric_save_toast = true

              this.lyricSearchResult = result.lyrics
            }
          }
          this.lyricSearching = false
        })
    },
    loadLrc(lrc, save = false) {
      this.lyric_save_toast = false
      try {
        window._lrc.load(lrc)
      } catch (e) {
        window._lrc.load(`[00:00.000]`)
        return this.$snackbar('Cannot load this plain text lyric.')
      }
      this.lyric = window._lrc.getLyrics()
      this.lyric_raw = lrc
      this.lyricFocus = 0 // 歌詞進度歸零
      try {
        //如果最後兩個時間相同把後面那個的時間調到一個世紀後
        if (
          window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2].timestamp ==
          window._lrc.lyrics_all[window._lrc.lyrics_all.length - 1].timestamp
        ) {
          window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2].timestamp += 100
          this.lyricTranslated = true
          window._lrc.lyrics_all = window._lrc.lyrics_all.sort((a, b) => a.timestamp - b.timestamp)
        } else {
          this.lyricTranslated = false
        }
      } catch (e) {
        this.lyricTranslated = false
      }
      this.lyricSearching = false
      if (save) {
        let nowPlaying = _player.list.audios[_player.list.index]
        this.axios.post(_setting(`server`) + `/pokaapi/lyric`, {
          title: nowPlaying.name,
          artist: nowPlaying.artist,
          songId: nowPlaying.id,
          source: nowPlaying.source,
          lyric: lrc
        })
        this.$snackbar(this.$t('lrc_saved'))
      }
      this.updateLyric()
    },
    setLyricTheme(lyricTheme) {
      window._setting('lyricTheme', lyricTheme)
      this.lyric_theme_dialog = false
      this.lyric_theme = lyricTheme
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { n: { lyricTheme } }
      })
    },
    saveCurrentLyric() {
      this.loadLrc(this.lyric_raw, true)
    }
  }
}
</script>

<style lang="sass" scoped>
.save-current-lyric
  position: absolute
  bottom: 0
  left: 0
  right: 0
  margin: auto
[theme="default"] .lyric
  text-align: center
  padding: 0 0
  p
    transition: all 0.5s cubic-bezier(0.77, 0, 0.18, 1), color 0.2s linear, opacity 0.2s linear
    opacity: .4
    line-height: 1.3em
    font-size: 1em
    >span
      line-height: 1.3em
    &.focus
      opacity: 1
      font-weight: 700
      text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1)
      font-size: 1.4em
      .theme--dark &
        text-shadow: 0 1px 4px rgba(255, 255, 255, 0.4)
    &+.tl
      font-size: 1.2em
      opacity: 1
    &.tl
      transform: translateY(-10px)
    &.lyricTranslated
      p.focus:not(:empty) + p
        opacity: .8
        transform: translateY(-8px)
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1)
        font-weight: 700
        .theme--dark &
          text-shadow: 0 1px 4px rgba(255, 255, 255, 0.4)
@media (min-width: 576px)
[theme="default"] .lyric
  font-size: 18px
[theme="bigtext"] .lyric
  padding: 0 25px
  p
    font-size: 2em
    line-height: 1.5em
    font-weight: 900
    transform: translateY(.1px)
    transition: all .3s ease
    opacity: .1
    &.focus
      opacity: 1
      filter: none
      &+.tl
        opacity: 1
        filter: none
    &.tl
      transform: translateY(-.4em)
      font-size: 1.5em

    @for $i from -4 through -1
      &[data-lyric-set="#{$i}"]
        transition-delay: #{.05*-$i}s
        opacity: #{.5+.1*$i}
    @for $i from 1 through 4
      &[data-lyric-set="#{$i}"]
        transition-delay: #{.05*-$i}s
        opacity: #{.5-.1*$i}
[theme="spacing"] .lyric
  padding: 0 25px
  text-align: center
  p
    font-size: 1.5em
    transform: translateY(.1px)
    transition: all .5s ease
    opacity: .25
    >span
      padding: .25em .2em
      transition: all .6s ease
    &.focus
      opacity: 1
      letter-spacing: 1px
      >span:not(:empty)
        color: #FFF
        background: var(--v-primary-base)
        z-index: 1
      &+.tl
        opacity: 1
        transform: translateY(-.75em)
    &.tl
      transform-origin: top
      font-size: 1.25em
      transform: translateY(-.75em) scale(.9)

    @for $i from -3 through -1
      &[data-lyric-set="#{$i}"]
        opacity: #{.25*(4+$i)}
    @for $i from 1 through 3
      &[data-lyric-set="#{$i}"]
        opacity: #{.25*(4-$i)}
[theme="underline"] .lyric
  padding: 0 25px
  text-align: center
  p
    font-size: 1.5em
    font-weight: bold
    transform: translateY(.1px)
    transition: all .5s ease
    opacity: .25
    >span
      padding: .25em .2em
      transition: .5s ease
      position: relative
      background-image: linear-gradient(transparent calc(65% - 5px),var(--v-primary-lighten3) 5px)
      background-size: 0
      background-repeat: no-repeat

    &.focus
      opacity: 1
      >span:not(:empty)
        background-size: 100%
      &+.tl
        opacity: 1
      &.tl
        transform-origin: top
        font-size: 1.25em
        font-weight: normal
        transform: translateY(-.75em)

    @for $i from -3 through -1
      &[data-lyric-set="#{$i}"]
        opacity: #{.25*(4+$i)}
    @for $i from 1 through 3
      &[data-lyric-set="#{$i}"]
        opacity: #{.25*(4-$i)}

@media (prefers-color-scheme: dark)
  [theme="underline"] .lyric p > span
    background-image: linear-gradient(transparent calc(65% - 5px),var(--v-primary-darken3) 5px)
</style>
