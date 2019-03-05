<template>
  <div>
    <poka-header/>
    <div style="position: relative">
      <h1>{{ audio_title }}</h1>
      <h2>{{ audio_artist }}</h2>
      <md-progress-bar
        class="md-accent"
        md-mode="buffer"
        :md-value="audio_currentTime"
        :md-buffer="audio_buffer"
      ></md-progress-bar>
      <md-list class="md-double-line">
        <md-list-item
          v-for="(song,index) of audio_queue"
          :key="index"
          :class="{active:index==audio_index}"
        >
          <md-avatar>
            <img :src="song.cover" alt="cover">
          </md-avatar>
          <div class="md-list-item-text" @click="playSong(index)">
            <span>{{song.name}}</span>
            <span>{{song.artist}}</span>
          </div>
          <md-button
            class="md-icon-button md-list-action"
            v-if="index==audio_index"
            @click="audio_toggle"
          >
            <md-icon v-if="audio_paused">play_arrow</md-icon>
            <md-icon v-else>pause</md-icon>
          </md-button>
          <md-button class="md-icon-button md-list-action" v-else @click="playSong(index)">
            <md-icon>play_arrow</md-icon>
          </md-button>
          <md-button class="md-icon-button md-list-action" @click="removeSong(index)">
            <md-icon>close</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "NowPlaying",
  data: () => ({
    audio_currentTime: 100,
    audio_buffer: 100,
    audio_paused: true,
    audio_cover: _setting(`randomImgSource`),
    audio_title: "等待播放中",
    audio_artist: "：Ｄ",
    audio_queue: null,
    audio_index: -1,
    NowPlaying_updatePlayer: null
  }),
  created() {
    this.updatePlayer();
    this.startUpdatePlayer();
  },
  destroyed() {
    this.stopUpdatePlayer();
  },
  methods: {
    startUpdatePlayer() {
      this.NowPlaying_updatePlayer = setInterval(
        () => this.updatePlayer(),
        350
      );
    },
    stopUpdatePlayer() {
      if (this.NowPlaying_updatePlayer) {
        clearInterval(this.NowPlaying_updatePlayer);
      }
    },
    updatePlayer() {
      if (_player.list.audios.length > 0) {
        let nowPlaying = _player.list.audios[_player.list.index];
        let buffered = _player.audio.buffered;
        let audioBuffered =
            _player.audio.currentTime > 1
              ? (buffered.end(buffered.length - 1) / _player.audio.duration) *
                100
              : 0,
          cent = (_player.audio.currentTime / _player.audio.duration) * 100;
        this.audio_index = _player.list.index;
        this.audio_currentTime = cent;
        this.audio_buffer = audioBuffered;
        this.audio_paused = _player.paused;
        this.audio_title = nowPlaying.name;
        this.audio_artist = nowPlaying.artist;
        this.audio_cover = nowPlaying.cover;
        this.audio_queue = _player.list.audios;
      }
    },
    playSong(i) {
      _player.list.switch(i);
      this.updatePlayer();
    },
    removeSong(i) {
      _player.list.remove(i);
      this.updatePlayer();
    },
    audio_toggle() {
      _player.toggle();
      this.audio_paused = _player.paused;
    }
  }
};
</script>
<style lang="sass" scoped>
.md-list
	width: 100%
	background-color: transparent
	.md-list-item
		border-radius: 8px
		overflow: hidden
		transition-duration: 0.6s
		transition-property: background-color, box-shadow
		transition-timing-function: ease
		*
	  		cursor: pointer
		&:hover
			background-color: rgba(0, 0, 0,.12)
		&.active
			background-color: rgb(255, 255, 255)
			box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2)
@media screen and (max-width: 600px) 
	.md-list
		.md-list-item
			width: 100%
</style>