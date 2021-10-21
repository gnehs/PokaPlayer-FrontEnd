<template>
  <div class="bottom-player">
    <div class="app-progress-bar">
      <v-slider min="0" max="100" step="0.000001" v-model="audio_currentTimePercent" @change="audio_seek" hide-details></v-slider>
    </div>
    <div
      class="song-info"
      v-touch="{
        up: () => $router.push('/fullscreen')
      }"
    >
      <div class="left">
        <div class="cover">
          <v-fade-transition mode="out-in">
            <img :src="audio_cover" :key="audio_cover" />
          </v-fade-transition>
        </div>
        <div class="song-title" @click="$router.push('/fullscreen')">
          <div class="song-name">{{ audio_title }}</div>
          <div class="song-artist">
            {{ audio_artist || $t('app_waitForPlay') }}
          </div>
        </div>
      </div>
      <div class="center">
        <span class="time">{{ audio_currentTime }}</span>

        <v-btn icon @click="audio_previous">
          <v-icon class="bx">bx-skip-previous</v-icon>
        </v-btn>

        <v-btn small fab depressed @click="audio_toggle" color="primary">
          <v-icon class="anicons" :style="{ 'font-variation-settings': audio_paused ? `` : `'TIME' 100` }">H</v-icon>
        </v-btn>

        <v-btn icon @click="audio_next">
          <v-icon class="bx">bx-skip-next</v-icon>
        </v-btn>

        <span class="time">{{ audio_totalTime }}</span>
      </div>
      <div class="right" v-if="audio_artist">
        <div
          :style="`display: flex;padding: 20px 0;min-width: 160px;justify-content: flex-end;`"
          @mouseover="audio_volume_hover = true"
          @mouseleave="audio_volume_hover = false"
        >
          <v-fade-transition>
            <v-slider v-show="audio_volume_hover" v-model="audio_volume" hide-details style thumb-label></v-slider>
          </v-fade-transition>
          <v-btn icon @click="audio_volume ? (audio_volume = 0) : (audio_volume = 100)">
            <v-icon class="bx" v-if="audio_volume == 0">bx-volume-mute</v-icon>
            <v-icon class="bx" v-else-if="audio_volume < 50">bx-volume-low</v-icon>
            <v-icon class="bx" v-else>bx-volume-full</v-icon>
          </v-btn>
        </div>
        <v-btn icon @click="switch_audio_order">
          <v-icon class="bx" v-if="audio_order === 'list'">bx-sync</v-icon>
          <v-icon class="bx" v-else>bx-shuffle</v-icon>
        </v-btn>
        <v-btn icon to="/fullscreen">
          <v-icon class="bx">bx-up-arrow</v-icon>
        </v-btn>
      </div>
      <div class="right" v-else>
        <play-random-button />
      </div>
      <div class="right-s" v-if="audio_artist">
        <v-btn icon @click="audio_previous">
          <v-icon class="bx">bx-skip-previous</v-icon>
        </v-btn>

        <v-btn small fab depressed @click="audio_toggle" color="primary">
          <v-icon class="anicons" :style="{ 'font-variation-settings': audio_paused ? `` : `'TIME' 100` }">H</v-icon>
        </v-btn>

        <v-btn icon @click="audio_next">
          <v-icon class="bx">bx-skip-next</v-icon>
        </v-btn>
      </div>
      <div class="right-s" v-else>
        <play-random-button />
      </div>
    </div>
    <v-dialog v-model="fullscreen" fullscreen transition="dialog-bottom-transition">
      <div class="fullscreen-player" v-if="fullscreen">
        <v-fade-transition>
          <div class="fullscreen-player-background" :style="{ backgroundImage: `url('${audio_cover}')` }" :key="audio_cover"></div>
        </v-fade-transition>
        <div class="fullscreen-player-content">
          <player-player v-if="$vuetify.breakpoint.mdAndUp" />
          <div class="player-content" :style="{ overflow: nav_active == 'player' ? 'initial' : 'hidden' }">
            <div
              class="nav"
              v-touch="{
                down: () => $router.go(-1)
              }"
            >
              <div class="nav-items">
                <div
                  class="nav-item"
                  :class="{ active: nav_active == 'player' }"
                  @click="nav_active = 'player'"
                  v-show="!$vuetify.breakpoint.mdAndUp"
                >
                  Player
                </div>
                <div class="nav-item" :class="{ active: nav_active == 'playlist' }" @click="nav_active = 'playlist'">Playlist</div>
                <div class="nav-item" :class="{ active: nav_active == 'lyric' }" @click="nav_active = 'lyric'">Lyric</div>
              </div>
              <portal-target name="fullscreen-player-action" slim>
                <div class="action"></div>
              </portal-target>
            </div>
            <player-player
              class="player-list"
              v-if="nav_active == 'player'"
              v-touch="{
                left: () => (nav_active = 'playlist')
              }"
            />
            <player-playlist
              class="player-list"
              v-if="nav_active == 'playlist'"
              v-touch="{
                left: () => (nav_active = 'lyric'),
                right: () => (nav_active = 'player')
              }"
            />
            <player-lyric
              class="player-list"
              v-if="nav_active == 'lyric'"
              v-touch="{
                right: () => (nav_active = 'playlist')
              }"
            />
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'buttom-player',
  data() {
    return {
      audio_interval: null,
      audio_currentTimePercent: 100,
      audio_bufferPercent: 100,
      audio_currentTime: '0:00',
      audio_totalTime: '0:00',
      audio_paused: true,
      audio_recored: false,
      audio_cover: _setting(`headerBgSource`),
      audio_title: 'PokaPlayer',
      audio_artist: null,
      audio_order: _player.options.order,
      audio_volume: 100,
      audio_volume_hover: false,
      nav_active: 'playlist',
      fullscreen: this.$route.path == '/fullscreen'
    }
  },
  watch: {
    audio_volume(val) {
      _player.volume(val / 100, true)
    },
    '$route.path': function(val, oldVal) {
      this.fullscreen = this.$route.path == '/fullscreen'
    }
  },
  destroyed() {
    if (this.audio_interval) clearInterval(this.audio_interval)
  },
  created() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        _player.toggle()
        navigator.mediaSession.playbackState = 'playing'
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        _player.pause()
        navigator.mediaSession.playbackState = 'paused'
      })
      navigator.mediaSession.setActionHandler('previoustrack', () => _player.skipBack())
      navigator.mediaSession.setActionHandler('nexttrack', () => _player.skipForward())
      try {
        navigator.mediaSession.setActionHandler('seekto', event => {
          console.log('seek to', event.seekTime)
          _player.seek(event.seekTime)

          if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
              duration: _player.audio.duration || 0,
              playbackRate: 1,
              position: _player.audio.currentTime || 0
            })
          }
        })
      } catch (error) {
        console.warn('Warning! The "seekto" media session action is not supported.')
      }
    }
    this.audio_interval = setInterval(() => {
      let currentTime = _player.audio.currentTime || 0,
        totalTime = _player.audio.duration || 0
      this.audio_paused = _player.paused
      this.audio_order = _player.options.order
      if (_player.list.audios.length > 0) {
        let { name: title, artist, album, cover } = _player.list.audios[_player.list.index]
        if (this.audio_title != title) {
          this.audio_recored = false
          // mediaSession
          if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title,
              artist,
              album,
              artwork: [{ src: cover }]
            })
          }
        }
        let buffered = _player.audio.buffered
        let audioBuffered = currentTime > 1 ? (buffered.end(buffered.length - 1) / totalTime) * 100 : 0
        let cent = (currentTime / totalTime) * 100
        this.audio_currentTimePercent = cent
        this.audio_bufferPercent = audioBuffered
        this.audio_title = title
        this.audio_artist = artist
        this.audio_cover = cover
        this.audio_currentTime = this.secondToTime(currentTime)
        this.audio_totalTime = this.secondToTime(totalTime)
        // record
        if (totalTime && currentTime + 10 > totalTime && !this.audio_recored && window._setting('dataRecord')) {
          this.audio_recored = true
          this.axios.post(`${_setting('server')}/pokaapi/v2/record/add`, _player.list.audios[_player.list.index])
        }
      } else {
        this.audio_currentTime = '0:00'
        this.audio_totalTime = '0:00'
        this.audio_currentTimePercent = 100
        this.audio_bufferPercent = 100
        this.audio_title = 'PokaPlayer'
        this.audio_artist = null
        this.audio_recored = false
        this.audio_cover = _setting(`headerBgSource`)
        if ('mediaSession' in navigator) {
          console.log('[mediaSession] metadata cleared.')
          navigator.mediaSession.metadata = null
        }
      }
    }, 400)
  },

  methods: {
    secondToTime(second) {
      //秒數轉時間
      let MM = Math.floor(second / 60)
      let SS = Math.floor(second % 60)
      SS = SS < 10 ? '0' + SS : SS
      return MM + ':' + SS
    },
    audio_toggle() {
      if (_player.list.audios.length > 0) {
        _player.toggle()
        this.audio_paused = _player.paused
      } else {
        this.$randomPlay()
      }
    },
    audio_next() {
      _player.skipForward()
      _player.play()
    },
    audio_previous() {
      _player.skipBack()
      _player.play()
    },
    audio_seek() {
      _player.seek((this.audio_currentTimePercent / 100) * _player.audio.duration)
    },
    switch_audio_order() {
      _player.options.order = _player.options.order === 'random' ? 'list' : 'random'
      this.audio_order = _player.options.order
    }
  }
}
</script>
<style lang="sass" >
.fullscreen-player
  position: relative
  height: calc(var(--vh,1vh) * 100)
  width: 100vw
  background-color: #000
  overflow: hidden
  display: grid
  place-content: center
  color: #fff
  *
    box-sizing: border-box
  .fullscreen-player-background
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    width: 100%
    height: 100%
    background-size: cover
    background-position: center
    opacity: .6
    overflow: hidden
    &::before
      content: ""
      position: absolute
      width: 100%
      height: calc(var(--vh,1vh) * 100)
      backdrop-filter: blur(128px)
  .close
    position: absolute
    right: 8px
    top: 8px
  .fullscreen-player-content
    width: calc(100vw - 32px)
    max-width: 1200px
    position: relative
    display: flex
    gap: 24px
    align-items: center
    height: calc(var(--vh,1vh) * 100 - 32px)
    .player-content
      height: 100%
      width: 100%
      flex: 1
      display: flex
      flex-direction: column
      overflow: hidden
      .nav
        display: flex
        align-items: center
        justify-content: center
        .nav-items
          display: flex
          .nav-item
            width: 80px
            font-size: 18px
            line-height: 2em
            cursor: pointer
            position: relative
            font-weight: bold
            text-align: center
            padding-bottom: 4px
            &:before
              position: absolute
              content: ''
              width: 100%
              bottom: 0
              left: 0
              height: 4px
              background-color: #fff
              border-radius: 4px 4px 0 0
              transform: scaleY(0)
              transform-origin: center bottom
              transition: transform .2s, opacity .2s
            &:not(.active):hover
              &:before
                transform: none
                opacity: .4
                transform: scaleY(0.5)
            &.active
              &:before
                transform: none
        .action
          flex: 1
          text-align: right
      .player-list
        flex: 1
        height: 100%
        width: 100%
        max-width: calc(100vw - 32px)
        overflow-y: scroll
        .poka.list
          gap: 0
          .active
            background-color: rgba(0,0,0,.25)
            color: #fff
            .v-btn
              color: #fff
            &:before
              display: none
</style>
<style lang="sass" scoped>
.bottom-player
  box-sizing: border-box
  height: 64px
  max-height: 64px
  backdrop-filter: blur(8px)
  z-index: 99
  position: fixed
  background-color: rgba(245, 245, 245, 0.95)

  --cover-size: 56px
  @media (prefers-color-scheme: dark)
    &
      background-color: var(--surface2)
  .app-progress-bar
    margin: -16px -8px
  .song-info
    display: grid
    grid-gap: 10px
    grid-template-columns: 1fr 250px 1fr
    width: 100vw
    max-width: 100vw
    box-sizing: border-box
    .left
      display: flex
      align-items: center
      overflow: hidden
      height: 64px
      .song-title
        flex: 1
        overflow: hidden
        cursor: pointer
        .song-name,.song-artist
          padding-left: 2px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          line-height: 22px
        .song-name
          font-weight: bold
      .cover
        margin: 0 8px
        height: var(--cover-size)
        min-width: var(--cover-size)
        background-size: cover
        background-position: center
        background-color: white
        border-radius: 8px
        overflow: hidden
        img
          transition: all .6s cubic-bezier(0.55, 0, 0.1, 1)
          width: var(--cover-size)
          height: var(--cover-size)
          max-width: var(--cover-size)
          max-height: var(--cover-size)
          object-fit: cover
    .center
      display: flex
      align-items: center
      height: 64px
      justify-content: center
      span.time
        font-family: var(--product-font)
        width: 2.8em
        text-align: center
    .right
      display: flex
      align-items: center
      height: 64px
      justify-content: flex-end
      padding-right: 8px
    .right-s
      width: 144px
      display: none
      align-items: center
      height: 64px
      justify-content: flex-end
      padding-right: 8px
@media screen and (max-width: 600px)
  .bottom-player
    .song-info
      grid-template-columns: 1fr 144px
      .center,.right
        display: none
      .right-s
        display: flex
</style>