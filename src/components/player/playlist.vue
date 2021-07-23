<template>
  <div>
    <portal to="fullscreen-player-action">
      <div class="action">
        <v-btn icon dark @click="switch_audio_order">
          <v-icon class="material-icons-outlined" v-if="audio_order === 'list'">repeat</v-icon>
          <v-icon class="material-icons-outlined" v-else>shuffle</v-icon>
        </v-btn>
        <v-btn icon dark @click="audio_clean"> <v-icon class="material-icons-outlined">clear_all</v-icon></v-btn>
        <v-btn icon @click="$router.go(-1)" dark large>
          <v-icon class="material-icons-outlined">expand_more</v-icon>
        </v-btn>
      </div>
    </portal>
    <poka-parse-songs v-if="audio_queue.length" :data="audio_queue" now-playing :active-index="audio_index">
      <template slot-scope="props">
        <v-btn icon @click.stop="props.moreDialog(props.song)" v-show="isSafari" dark>
          <v-icon class="material-icons-outlined">more_horiz</v-icon>
        </v-btn>
        <v-btn icon @click.stop="removeSong(props.index)" dark>
          <v-icon class="material-icons-outlined">close</v-icon>
        </v-btn>
      </template>
    </poka-parse-songs>
    <div v-if="!audio_queue.length" style="margin-top: 30vh; text-align: center">
      <v-icon class="display-4 material-icons-outlined" dark>queue_music</v-icon>
      <p class="headline">{{ $t('app_waitForPlay') }}</p>
      <p>{{ $t('app_waitForPlay_description') }}</p>
      <play-random-button />
    </div>
  </div>
</template> 
<script>
export default {
  name: 'player-playlist',
  data: () => ({
    audio_queue: null,
    audio_order: _player.options.order,
    audio_index: -1,
    updateInterval: null,
    bgSlideAnimation: 'slide-left',
    isSafari: /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
  }),
  created() {
    this.updatePlayer()
    this.startUpdatePlayer()
    this.focusActive()
  },
  destroyed() {
    this.stopUpdatePlayer()
  },
  methods: {
    startUpdatePlayer() {
      this.updateInterval = setInterval(() => this.updatePlayer(), 400)
    },
    stopUpdatePlayer() {
      if (this.updateInterval) clearInterval(this.updateInterval)
    },
    updatePlayer() {
      this.audio_queue = _player.list.audios
      if (this.audio_index != _player.list.index) {
        this.audio_index = _player.list.index
        this.audio_order = _player.options.order
        this.focusActive()
      }
    },
    focusActive() {
      this.$nextTick(() => {
        let focusedLyric = document.querySelector('.poka.list .item.active')
        if (focusedLyric) {
          focusedLyric.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      })
    },
    removeSong(index) {
      _player.list.remove(index)
      this.updatePlayer()
    },
    audio_clean() {
      _player.list.clear()
    },
    switch_audio_order() {
      _player.options.order = _player.options.order === 'random' ? 'list' : 'random'
      this.audio_order = _player.options.order
    }
  }
}
</script>
 