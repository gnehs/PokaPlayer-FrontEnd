<template>
  <div>
    <poka-header :blurbg="true" :bg="audio_cover"/>
    <div style="position: relative">
      <transition-group
        name="songlist"
        tag="md-list"
        class="md-double-line"
        v-if="audio_queue.length>0"
      >
        <md-list-item
          v-for="(song,index) of audio_queue"
          :key="song.uuid"
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
      <md-empty-state
        v-else
        md-icon="queue_music"
        md-label="佇列中尚未有歌曲"
        md-description="加入一些歌曲，或是點選底下的隨機播放"
      >
        <md-button
          class="md-primary md-raised"
          @click="randomPlay"
          v-if="!loadingRandom"
        >{{$t('playlist_random')}}</md-button>
        <poka-loader v-else/>
      </md-empty-state>
    </div>
  </div>
</template>

<script>
export default {
  name: "NowPlaying",
  data: () => ({
    server: _setting(`server`),
    loadingRandom: false,
    defaultCover: _setting(`headerBgSource`),
    audio_paused: true,
    audio_cover: _setting(`headerBgSource`),
    audio_queue: null,
    audio_index: -1,
    audio_uuid: ":D",
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
        400
      );
    },
    stopUpdatePlayer() {
      if (this.NowPlaying_updatePlayer) {
        clearInterval(this.NowPlaying_updatePlayer);
      }
    },
    updatePlayer() {
      this.audio_queue = _player.list.audios;
      this.audio_paused = _player.paused;
      if (_player.list.audios.length > 0) {
        let uuid_temp = this.audio_uuid;
        this.audio_index = _player.list.index;
        this.audio_uuid = _player.list.audios[this.audio_index].uuid;
        this.audio_cover = _player.list.audios[this.audio_index].cover;
        if (uuid_temp != this.audio_uuid) {
          //換歌ㄌ
          this.$nextTick(() => {
            if ($(".md-list > .active").length > 0) {
              let sh =
                $(".md-list > .active")[0].offsetTop -
                $(".md-list > .active").height() / 2 -
                $(".md-list > .active")[0].clientHeight -
                $(window).height() * 0.15;
              $(".md-app-content")
                .clearQueue()
                .animate(
                  {
                    scrollTop: sh
                  },
                  250
                );
            }
          });
        }
      } else {
        this.audio_cover = _setting(`headerBgSource`);
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
    audio_toggle() {
      _player.toggle();
      this.audio_paused = _player.paused;
    },
    randomPlay() {
      let randomStr = Math.random()
        .toString(36)
        .substring(7);
      this.axios(`/pokaapi/randomSongs?${randomStr}`).then(res => {
        this.addSongs({ songlist: res.data.songs });
      });
    },
    addSongs({ songlist, index, clear = true }) {
      let playlist = [];
      for (let nowsong of songlist) {
        playlist.push({
          url:
            this.server +
            nowsong.url +
            "&songRes=" +
            _setting(`audioQuality`).toLowerCase(),
          cover: nowsong.cover
            ? this.server + nowsong.cover
            : this.defaultCover,
          name: nowsong.name,
          artist: nowsong.artist,
          album: nowsong.album,
          id: nowsong.id,
          source: nowsong.source,
          uuid: _uuid()
        });
      }
      if (clear) _player.list.clear();
      _player.list.add(playlist);
      if (index) _player.list.switch(index);
      _player.play();
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
			--cover-size: 200px
			width: var(--cover-size)
			height: 0
			overflow: hidden
			padding-bottom: var(--cover-size)
			border-radius: calc(var(--cover-size) * .08)
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3)
			background-size: cover
			background-position: center
			background-color: #0000
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
.md-theme-default-dark.md-list
	.md-list-item
		&.active
			background-color: rgba(0, 0, 0, .3)
@media screen and (max-width: 600px) 
	.md-list
		.md-list-item
			width: 100%
</style>