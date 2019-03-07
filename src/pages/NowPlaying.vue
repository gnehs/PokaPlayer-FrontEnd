<template>
  <div>
    <poka-header :blurbg="true" :bg="audio_cover"/>
    <div class="audio-info">
      <div class="top">
        <div class="cover">
          <img :src="audio_cover">
        </div>
        <div class="info">
          <div class="title">{{ audio_title }}</div>
          <div class="artist">{{ audio_artist }}</div>
          <div class="control">
            <md-button class="md-icon-button" @click="audio_previous">
              <md-icon>skip_previous</md-icon>
            </md-button>
            <md-button class="md-icon-button md-raised md-primary" @click="audio_toggle">
              <md-icon v-if="audio_paused">play_arrow</md-icon>
              <md-icon v-else>pause</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="audio_next">
              <md-icon>skip_next</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="now-playing-progress-bar">
          <span>{{audio_currentTime}}</span>
          <div class="bar">
            <md-progress-bar
              class="md-accent"
              md-mode="buffer"
              :md-value="audio_currentTimePercent"
              :md-buffer="audio_buffer"
            ></md-progress-bar>
            <label class="pure-material-slider">
              <input
                type="range"
                min="0"
                max="100"
                step="0.000001"
                v-model="audio_currentTimePercent"
                v-on:input="audio_seek"
              >
            </label>
          </div>
          <span>4:00</span>
        </div>
      </div>
    </div>
    <div style="position: relative">
      <transition-group name="songlist" tag="md-list" class="md-double-line">
        <md-list-item
          v-for="(song,index) of audio_queue"
          :key="song.name+index"
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
    audio_currentTimePercent: 100,
    audio_currentTime: "0:00",
    audio_totalTime: "0:00",
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
        this.audio_currentTimePercent = cent;
        this.audio_buffer = audioBuffered;
        this.audio_title = nowPlaying.name;
        this.audio_artist = nowPlaying.artist;
        this.audio_cover = nowPlaying.cover;
        this.audio_currentTime = this.secondToTime(_player.audio.currentTime);
        this.audio_totalTime = this.secondToTime(_player.audio.duration);
      } else {
        this.audio_currentTimePercent = 100;
        this.audio_totalTime = "0:00";
        this.audio_currentTime = "0:00";
        this.audio_buffer = 100;
        this.audio_title = "等待播放中";
        this.audio_artist = "：Ｄ";
        this.audio_cover = _setting(`randomImgSource`);
      }
    },
    secondToTime(second) {
      //秒數轉時間
      let MM = Math.floor(second / 60);
      let SS = Math.floor(second % 60);
      SS = SS < 10 ? "0" + SS : SS;
      return MM + ":" + SS;
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
      _player.seek(
        (this.audio_currentTimePercent / 100) * _player.audio.duration
      );
    }
  }
};
</script>
<style lang="sass" scoped>
.songlist-enter, .songlist-leave-to
	opacity: 0
	transform: scaleY(0) scaleX(0.9)
	transform-origin: center top
.songlist-leave-active 
  	position: absolute
.songlist-move
	transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95)
	transition-property: opacity, transform

.audio-info
  position: relative
  >.top
    display: flex
    padding: 8px
    position: relative
    align-items: center
    >.cover    
      --cover-size: 280px
      width: var(--cover-size)
      height: 0
      overflow: hidden
      padding-bottom: var(--cover-size)
      border-radius: calc(var(--cover-size) * .08)
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3)
      >img
        object-fit: cover
        width: var(--cover-size)
        height: var(--cover-size)
    >.info
      margin: 16px
      margin-left: 24px
      overflow: hidden
      >.title,>.artist
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      >.title
        font-size: 48px
        font-weight: bold
        line-height: 1.1em
      >.artist
        font-size: 32px
        line-height: 1.1em
      >.control
        margin-top: 16px
        margin-bottom: 16px
        >.md-icon-button
          --icon-size: 30px
          --button-size: 50px
          width: var(--button-size)
          min-width: var(--button-size)
          height: var(--button-size)
          .md-icon 
            width: var(--icon-size)
            min-width: var(--icon-size)
            height: var(--icon-size)
            font-size: var(--icon-size) !important
  .bottom-bar
    padding: 8px 0 
    position: relative
@media screen and (max-width: 780px) 
  .audio-info
    .top
      display: block
      .cover    
        --cover-size: 100%
        --cover-size-max: 100%
        >img
          width: 100vw
          height: 100vw
      .info
        .title,.artist,.control
          text-align: center
        .title
          font-size: 32px
        .artist
          font-size: 24px
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