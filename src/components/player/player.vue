<template>
  <div class="player">
    <portal to="fullscreen-player-action">
      <div class="action">
        <v-btn icon dark @click="switch_audio_order">
          <v-icon class="material-icons-outlined" v-if="audio_order === 'list'">repeat</v-icon>
          <v-icon class="material-icons-outlined" v-else>shuffle</v-icon>
        </v-btn>
        <v-btn icon @click="$router.go(-1)" dark large v-if="$vuetify.breakpoint.mdAndUp">
          <v-icon class="material-icons-outlined">expand_more</v-icon>
        </v-btn>
      </div>
    </portal>
    <div class="player-cover">
      <v-fade-transition mode="out-in">
        <poka-cover :cover="audio_cover" size="400px" :key="audio_cover" />
      </v-fade-transition>
    </div>
    <div class="player-title">{{ audio_title }}</div>
    <div class="player-artist">
      {{ audio_artist || $t('app_waitForPlay') }}
    </div>
    <v-slider color="#fff" min="0" max="100" step="0.001" v-model="audio_currentTimePercent" @change="audio_seek" hide-details />
    <div class="player-duration">
      <div class="time">{{ audio_currentTime }}</div>

      <div class="time">{{ audio_totalTime }}</div>
    </div>
    <div class="player-control">
      <v-btn icon @click="audio_previous" dark large>
        <v-icon class="material-icons-outlined">skip_previous</v-icon>
      </v-btn>

      <v-btn dark @click="audio_toggle" color="gray" class="play-btn" fab>
        <v-icon class="anicons" :style="{ 'font-variation-settings': audio_paused ? `` : `'TIME' 100` }">H</v-icon>
      </v-btn>

      <v-btn icon @click="audio_next" dark large>
        <v-icon class="material-icons-outlined">skip_next</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-player',
  data: () => ({
    audio_currentTimePercent: 100,
    audio_bufferPercent: 100,
    audio_currentTime: '0:00',
    audio_totalTime: '0:00',
    audio_paused: true,
    audio_cover: _setting(`headerBgSource`),
    audio_title: 'PokaPlayer',
    audio_artist: null,
    audio_order: _player.options.order,
    audio_volume: 100,
    audio_volume_hover: false
  }),
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
    this.updatePlayer()
    this.audio_interval = setInterval(() => {
      this.updatePlayer()
    }, 400)
  },

  methods: {
    updatePlayer() {
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
    },
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
<style lang="sass">
.player
	--size: 400px
	width: var(--size) !important
	display: flex
	flex-direction: column
	margin: 0 auto
	overflow: initial !important
	justify-content: center
	.v-slider--horizontal
		margin-right: 0
		margin-left: 0
	.player-cover
		margin-bottom: 16px
		img
			width: var(--size)
			height: var(--size)
			object-fit: cover
			border-radius: 16px
	.player-title
		font-weight: bold
		font-size: 24px
	.player-artist
		font-size: 18px
		opacity: .8
		margin-bottom: 16px
	.v-input
		flex: initial
		.v-slider__track-background.v-slider__track-background
			background-color: rgba(255,255,255,.3) !important
	.player-duration
		display: grid
		grid-template-columns: repeat(2, 1fr)
		margin-top: -8px
		.time
			text-align: left
		.time + .time
			text-align: right
	.player-control
		text-align: center
		.play-btn
			background-color: rgb(0 0 0 / 35%)
			backdrop-filter: blur(10px)
</style>