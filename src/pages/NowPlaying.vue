<template>
  <div>
    <poka-header/>
    <div style="position: relative">
      <h1>{{ audio_title }}</h1>
      <h2>{{ audio_artist }}</h2>
      <div class="progress-bar">
        <md-progress-bar
          class="md-accent"
          md-mode="buffer"
          :md-value="audio_currentTime"
          :md-buffer="audio_buffer"
        ></md-progress-bar>
        <label class="pure-material-slider">
          <input
            type="range"
            min="0"
            max="100"
            step="0.000001"
            v-model="audio_currentTime"
            v-on:input="audio_seek"
          >
        </label>
      </div>

      <md-button class="md-icon-button" @click="audio_previous">
        <md-icon>skip_previous</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="audio_toggle">
        <md-icon v-if="audio_paused">play_arrow</md-icon>
        <md-icon v-else>pause</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="audio_next">
        <md-icon>skip_next</md-icon>
      </md-button>
      <transition-group name="songlist" tag="md-list" class="md-double-line">
        <md-list-item
          v-for="(song,index) of audio_queue"
          :key="song.name"
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
      </transition-group>
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
      let nowPlaying = _player.list.audios[_player.list.index];
      this.audio_queue = _player.list.audios;
      this.audio_paused = _player.paused;
      if (_player.list.audios.length > 0) {
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
        this.audio_title = nowPlaying.name;
        this.audio_artist = nowPlaying.artist;
        this.audio_cover = nowPlaying.cover;
      } else {
        this.audio_currentTime = 100;
        this.audio_buffer = 100;
        this.audio_title = "等待播放中";
        this.audio_artist = "：Ｄ";
        this.audio_cover = _setting(`randomImgSource`);
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
    audio_next() {
      _player.skipForward();
    },
    audio_previous() {
      _player.skipBack();
    },
    audio_toggle() {
      _player.toggle();
      this.audio_paused = _player.paused;
    },
    audio_seek() {
      _player.seek((this.audio_currentTime / 100) * _player.audio.duration);
    }
  }
};
</script>
<style lang="sass" scoped>
.progress-bar
  position: relative
  .pure-material-slider
    position: absolute
    top: -15px
    opacity: 0
.songlist-enter, .songlist-leave-to
	opacity: 0
	transform: scaleY(0) scaleX(0.9)
	transform-origin: center top
.songlist-leave-active 
  	position: absolute
.songlist-move
	transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95)
	transition-property: opacity, transform

.md-list
	width: 100%
	background-color: transparent
	position: relative
	display: block
	.md-list-item
		display: block
		border-radius: 8px
		width: 100%
		overflow: hidden
		transition: all 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95)
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