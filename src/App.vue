<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="2" id="toolbar">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button menu" @click="toggleMenu">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">PokaPlayer</span>
          </div>
          <div class="md-toolbar-section-end">
            <md-menu>
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="switchTheme">
                  <md-icon v-if="!settings.darkMode">brightness_3</md-icon>
                  <md-icon v-if="settings.darkMode">brightness_7</md-icon>
                  <span v-if="!settings.darkMode" class="md-list-item-text">{{$t('settings_dark')}}</span>
                  <span v-if="settings.darkMode" class="md-list-item-text">{{$t('settings_light')}}</span>
                </md-menu-item>
                <md-menu-item to="/setting">
                  <md-icon class="outline-settings"></md-icon>
                  <span class="md-list-item-text">{{$t("settings")}}</span>
                </md-menu-item>
                <md-menu-item to="/about">
                  <md-icon class="outline-info"></md-icon>
                  <span class="md-list-item-text">{{$t("settings_aboutAndHelp")}}</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-permanent="clipped">
        <md-list>
          <md-list-item to="/home" @click="closeMenu">
            <md-icon class="outline-home"/>
            <span class="md-list-item-text">{{$t("home")}}</span>
          </md-list-item>
          <md-list-item to="/now" @click="closeMenu">
            <md-icon class="outline-playlist_play"/>
            <span class="md-list-item-text">{{$t("nowplaying")}}</span>
          </md-list-item>
          <md-list-item to="/lyric" @click="closeMenu">
            <md-icon class="outline-subtitles"/>
            <span class="md-list-item-text">{{$t("lrc")}}</span>
          </md-list-item>
          <md-divider/>
          <md-list-item to="/search" @click="closeMenu">
            <md-icon class="outline-search"/>
            <span class="md-list-item-text">{{$t("search")}}</span>
          </md-list-item>
          <md-list-item to="/album" @click="closeMenu">
            <md-icon class="outline-album"/>
            <span class="md-list-item-text">{{$t("album")}}</span>
          </md-list-item>
          <md-list-item to="/folder" @click="closeMenu">
            <md-icon class="outline-folder"/>
            <span class="md-list-item-text">{{$t("folder")}}</span>
          </md-list-item>
          <md-list-item to="/artist" @click="closeMenu">
            <md-icon class="outline-mic_none"/>
            <span class="md-list-item-text">{{$t("artist")}}</span>
          </md-list-item>
          <md-list-item to="/composer" @click="closeMenu">
            <md-icon class="outline-music_note"/>
            <span class="md-list-item-text">{{$t("composer")}}</span>
          </md-list-item>
          <md-list-item to="/playlist" @click="closeMenu">
            <md-icon class="outline-format_list_bulleted"/>
            <span class="md-list-item-text">{{$t("playlist")}}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <transition :name="transitionName" mode="out-in">
          <router-view :key="$route.path"/>
        </transition>
      </md-app-content>
    </md-app>
    <div class="bottom-player">
      <div class="app-progress-bar">
        <md-progress-bar
          class="md-accent"
          md-mode="buffer"
          :md-value="audio_currentTimePercent"
          :md-buffer="audio_bufferPercent"
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
      <div class="song-info">
        <div class="left">
          <div class="cover">
            <img :src="audio_cover">
            <md-button class="md-icon-button md-mini" @click="audio_toggle">
              <md-icon v-if="audio_paused">play_arrow</md-icon>
              <md-icon v-else>pause</md-icon>
            </md-button>
          </div>
          <div class="info" @click="$router.push('/now')">
            <div class="title">{{audio_title}}</div>
            <div class="artist">{{audio_artist||$t('app_waitForPlay')}}</div>
          </div>
        </div>
        <div class="center">
          <span class="time">{{audio_currentTime}}</span>
          <div>
            <md-button class="md-icon-button" @click="audio_previous">
              <md-icon>skip_previous</md-icon>
            </md-button>
            <md-tooltip md-direction="left" v-show="audio_previous_name!=''">{{audio_previous_name}}</md-tooltip>
          </div>
          <md-button class="md-icon-button md-raised md-accent" @click="audio_toggle">
            <md-icon v-if="audio_paused">play_arrow</md-icon>
            <md-icon v-else>pause</md-icon>
          </md-button>
          <div>
            <md-button class="md-icon-button" @click="audio_next">
              <md-icon>skip_next</md-icon>
            </md-button>
            <md-tooltip md-direction="right" v-show="audio_next_name!=''">{{audio_next_name}}</md-tooltip>
          </div>
          <span class="time">{{audio_totalTime}}</span>
        </div>
        <div class="right">
          <md-button class="md-icon-button" @click="switch_audio_order">
            <md-icon class="outline-repeat" v-if="audio_order==='list'"></md-icon>
            <md-icon class="outline-shuffle" v-else></md-icon>
          </md-button>
          <md-button class="md-icon-button" to="/now" v-if="$route.path!='/now'">
            <md-icon class="outline-playlist_play"></md-icon>
          </md-button>
          <md-button class="md-icon-button" to="/lyric" v-else>
            <md-icon class="outline-subtitles"></md-icon>
          </md-button>
        </div>
        <div class="right-s">
          <md-button class="md-icon-button" @click="audio_previous">
            <md-icon>skip_previous</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised md-accent" @click="audio_toggle">
            <md-icon v-if="audio_paused">play_arrow</md-icon>
            <md-icon v-else>pause</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="audio_next">
            <md-icon>skip_next</md-icon>
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false,
    audio_currentTimePercent: 100,
    audio_bufferPercent: 100,
    audio_currentTime: "0:00",
    audio_totalTime: "0:00",
    audio_paused: true,
    audio_cover: _setting(`headerBgSource`),
    audio_title: "PokaPlayer",
    audio_artist: null,
    audio_next_name: "",
    audio_previous_name: "",
    audio_order: _player.options.order,
    transitionName: "fade",
    settings: { darkMode: window._setting("darkMode") }
  }),
  created() {
    function isMobile() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
    if (location.search == "?pwa" || !isMobile()) {
      $("body").attr("pwa", true);
    }
    this.$router.beforeEach((to, from, next) => {
      let transitionName =
        to.meta.transitionName || from.meta.transitionName || "fade";
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
        transitionName = toDepth == fromDepth ? "fade" : transitionName; //同一層
      }
      this.transitionName = transitionName;
      next();
    });
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.baseURL = _setting(`server`);
    this.testConnection();
    setInterval(() => {
      this.audio_paused = _player.paused;
      this.audio_order = _player.options.order;
      if (_player.list.audios.length > 0) {
        let nowPlaying = _player.list.audios[_player.list.index];
        let buffered = _player.audio.buffered;
        let audioBuffered =
            _player.audio.currentTime > 1
              ? (buffered.end(buffered.length - 1) / _player.audio.duration) *
                100
              : 0,
          cent = (_player.audio.currentTime / _player.audio.duration) * 100;
        this.audio_currentTimePercent = cent;
        this.audio_bufferPercent = audioBuffered;
        this.audio_paused = _player.paused;
        this.audio_title = nowPlaying.name;
        this.audio_artist = nowPlaying.artist;
        this.audio_cover = nowPlaying.cover;
        this.audio_currentTime = this.secondToTime(_player.audio.currentTime);
        this.audio_totalTime = this.secondToTime(_player.audio.duration);
        this.audio_next_name = _player.list.audios[_player.nextIndex()].name;
        this.audio_previous_name =
          _player.list.audios[_player.prevIndex()].name;
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: nowPlaying.name,
            artist: nowPlaying.artist,
            artwork: [
              {
                src: nowPlaying.cover,
                type: "image/png"
              }
            ]
          });
          navigator.mediaSession.setActionHandler("play", () =>
            _player.toggle()
          );
          navigator.mediaSession.setActionHandler("pause", () =>
            _player.pause()
          );
          navigator.mediaSession.setActionHandler("previoustrack", () =>
            _player.skipBack()
          );
          navigator.mediaSession.setActionHandler("nexttrack", () =>
            _player.skipForward()
          );
        }
      } else {
        this.audio_currentTime = "0:00";
        this.audio_totalTime = "0:00";
        this.audio_currentTimePercent = 100;
        this.audio_bufferPercent = 100;
        this.audio_paused = _player.paused;
        this.audio_title = "PokaPlayer";
        this.audio_artist = null;
        this.audio_cover = _setting(`headerBgSource`);
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = null;
        }
      }
    }, 400);
  },
  methods: {
    secondToTime(second) {
      //秒數轉時間
      let MM = Math.floor(second / 60);
      let SS = Math.floor(second % 60);
      SS = SS < 10 ? "0" + SS : SS;
      return MM + ":" + SS;
    },
    audio_toggle() {
      _player.toggle();
      this.audio_paused = _player.paused;
    },
    audio_next() {
      _player.skipForward();
    },
    audio_previous() {
      _player.skipBack();
    },
    audio_seek() {
      _player.seek(
        (this.audio_currentTimePercent / 100) * _player.audio.duration
      );
    },
    closeMenu() {
      this.menuVisible = false;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    switch_audio_order() {
      _player.options.order =
        _player.options.order === "random" ? "list" : "random";
      this.audio_order = _player.options.order;
    },
    switchTheme() {
      this.settings.darkMode = !this.settings.darkMode;
      window._setting("darkMode", this.settings.darkMode);
      this.settings.darkMode
        ? window._theme.switchToDark()
        : window._theme.switchToLight();
    },
    testConnection() {
      this.axios
        .get(_setting(`server`) + "/info/")
        .then(response => {
          if (!response.data.version) this.$router.push("/login");
        })
        .catch(e => this.$router.push("/login"));
    }
  }
};
</script>


<style lang="sass">
@import "@/assets/pokaList.sass"
</style>
<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine
@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    accent: md-get-palette-color(red, A200)
  )
);
@import "~vue-material/dist/theme/all"; // Apply the theme
@include md-register-theme(
  "default-dark",
  (
    primary: md-get-palette-color(blue, 100),
    accent: md-get-palette-color(blue, A200),
    theme: dark
  )
);
@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
<style lang="sass" scoped>
#toolbar.md-theme-default-dark
  --md-theme-default-dark-text-primary-on-primary: rgba(255, 255, 255, 0.87)
  --md-theme-default-dark-primary: #212121
#toolbar.md-theme-default
  --md-theme-default-text-primary-on-primary: rgba(0, 0, 0, 0.87)
  --md-theme-default-primary: rgb(245, 245, 245)
.md-toolbar .md-title
	font-family: var(--product-font)
	font-weight: bold
.page-container
	overflow: hidden

.md-app-content
	overflow-y: auto
	overflow-x: hidden

.bottom-player
	box-sizing: border-box
	height: 69px
	max-height: 69px
	.song-info
		display: flex
		align-items: center
		width: 100vw
		max-width: 100vw
		box-sizing: border-box
		.left
			display: flex
			align-items: center
			height: 64px
			width: 25vw
			.info
				flex: 1
				overflow: hidden
				cursor: pointer
				.title,.artist
					padding-left: 2px
					overflow: hidden
					text-overflow: ellipsis
					white-space: nowrap
					line-height: 24px
				.title
					font-weight: bold
			.cover
				margin: 0 8px
				--cover-size: 56px
				height: var(--cover-size)
				min-width: var(--cover-size)
				position: relative
				background-size: cover
				background-position: center 
				background-position: center 
				border-radius: 4px
				overflow: hidden
				img    
					transition: all .6s cubic-bezier(0.55, 0, 0.1, 1)
					width: var(--cover-size)
					height: var(--cover-size)
					max-width: var(--cover-size)
					max-height: var(--cover-size)
					object-fit: cover
				.md-button
					position: absolute 
					top: 50%
					left: 50%
					transform: translate(-70%, -50%) scale(.9)
					background-color: rgba(255, 255, 255, 0.7)
					opacity: 0
				&:hover 
					img
						filter: brightness(50%) blur(1px)
					.md-button
						transform: translate(-70%, -50%) scale(1)
						opacity: 1
		.center
			display: flex
			align-items: center
			height: 64px
			flex: 1
			justify-content: center
			span.time
				font-family: var(--product-font)
				width: 2.8em
				text-align: center
		.right
			width: 25vw
			display: flex
			align-items: center
			height: 64px
			justify-content: flex-end
		.right-s
			display: none
			align-items: center
			height: 64px
			justify-content: flex-end
		.md-button.next
			width: 30px
			min-width: 30px
			height: 30px
			margin: 0

@media screen and (max-width: 600px) 
	.bottom-player
		.song-info
			.left
				flex: 1
			.center,.right
				display: none
			.right-s
				display: flex
.md-app
	min-height: calc(100vh - 69px)
	max-height: calc(100vh - 69px)
body:not([pwa])
  .md-app
    min-height: calc(100vh - 69px - 64px)
    max-height: calc(100vh - 69px - 64px)
#drawer
	.drawer-player
		display: none
.md-app-content
	max-height: calc(100vh - 64px - 69px)

.md-toolbar, .md-toolbar-row 
		min-height: 64px

.md-drawer 
	width: 230px
	max-width: calc(100vw - 125px)
.router-link-active
	background: rgba(0, 0, 0, 0.05)
.md-theme-default-dark .router-link-active
	background: rgba(255, 255, 255, 0.1)
</style>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.35s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(3em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-3em, 0);
}
:root {
  --default-font: Roboto, "SF Pro TC", "SF Pro Text", "SF Pro Icons",
    "PingFang TC", "Helvetica Neue", "Helvetica", "Arial", "Source Hans",
    "思源黑體", "Noto Sans CJK TC", "Noto Sans TC", "Microsoft JhengHei",
    "Microsoft Yahei", wf_SegoeUI, "Segoe UI", Segoe, "Segoe WP", Tahoma,
    Verdana, Ubuntu, "Bitstream Vera Sans", "DejaVu Sans", Tahoma, 微軟正黑體,
    "LiHei Pro", "WenQuanYi Micro Hei", "Droid Sans Fallback", "AR PL UMing TW",
    "Helvetica Neue", "Hiragino Maru Gothic ProN", メイリオ,
    "ヒラギノ丸ゴ ProN W4", Meiryo, "Droid Sans", sans-serif;
  --product-font: "Product Sans", Roboto, "SF Pro TC", "SF Pro Text",
    "SF Pro Icons", "PingFang TC", "Helvetica Neue", "Helvetica", "Arial",
    "Source Hans", "思源黑體", "Noto Sans CJK TC", "Noto Sans TC",
    "Microsoft JhengHei", "Microsoft Yahei", wf_SegoeUI, "Segoe UI", Segoe,
    "Segoe WP", Tahoma, Verdana, Ubuntu, "Bitstream Vera Sans", "DejaVu Sans",
    Tahoma, 微軟正黑體, "LiHei Pro", "WenQuanYi Micro Hei",
    "Droid Sans Fallback", "AR PL UMing TW", "Helvetica Neue",
    "Hiragino Maru Gothic ProN", メイリオ, "ヒラギノ丸ゴ ProN W4", Meiryo,
    "Droid Sans", sans-serif;
}
.md-content.md-tabs-content {
  transition-duration: 0.3s;
  transition-property: height;
  transition-timing-function: ease;
}
.md-list .md-icon {
  opacity: 0.54;
}
.md-tab {
  padding: 16px 0;
}
.md-speed-dial {
  z-index: 2;
}
.md-app-content .md-list {
  background-color: transparent !important;
}

@media screen and (min-width: 600px) {
  .md-button.menu {
    display: none;
  }
}
.md-icon[class*="outline-"] {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}

.icon-white,
.md-theme-default-dark .md-icon[class*="outline-"] {
  color: #fff;
}
.md-dialog {
  max-width: 100vw;
}
.t-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>