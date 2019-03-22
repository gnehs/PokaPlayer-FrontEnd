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
      <!-- TODO: i18n -->
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
      <md-dialog-confirm
        :md-active.sync="cleanActive"
        md-title="確定清除所有歌曲？"
        md-content="這將會清除列表中所有歌曲！"
        :md-cancel-text="$t('cancel')"
        :md-confirm-text="$t('ok')"
        @md-confirm="audio_clean"
      />
    </div>

    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target>
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="switch_audio_order">
          <md-icon class="outline-repeat" v-if="audio_order==='list'"></md-icon>
          <md-icon class="outline-shuffle" v-else></md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="cleanActive=true">
          <md-icon>clear_all</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
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
    audio_title: "PokaPlayer",
    audio_artist: null,
    audio_order: _player.options.order,
    audio_uuid: ":D",
    NowPlaying_updatePlayer: null,
    cleanActive: false
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
      this.audio_order = _player.options.order;
      if (_player.list.audios.length > 0) {
        let uuid_temp = this.audio_uuid;
        this.audio_index = _player.list.index;
        this.audio_uuid = _player.list.audios[this.audio_index].uuid;
        this.audio_cover = _player.list.audios[this.audio_index].cover;
        this.audio_title = _player.list.audios[this.audio_index].name;
        this.audio_artist = _player.list.audios[this.audio_index].artist;
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
    audio_clean() {
      _player.list.clear();
    },
    switch_audio_order() {
      _player.options.order =
        _player.options.order === "random" ? "list" : "random";
      this.audio_order = _player.options.order;
    },
    randomPlay() {
      this.loadingRandom = true;
      let randomStr = Math.random()
        .toString(36)
        .substring(7);
      this.axios(`/pokaapi/randomSongs?${randomStr}`)
        .then(res => {
          this.addSongs({ songlist: res.data.songs });
          setTimeout(() => (this.loadingRandom = false), 500);
        })
        .catch(e => alert(`PokaPlayer Error\n${e}`));
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

.md-list
	width: 100%
	background-color: transparent
	position: relative
	display: block
	padding-bottom: 96px
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