<template>
  <div>
    <v-app-bar
      v-if="!$vuetify.breakpoint.mdAndUp"
      color="#FFF"
      app
      style="box-shadow: 0px 0px 0px .5px rgb(0 0 0 / 20%)"
    >
      <v-app-bar-nav-icon @click.stop="toggleMenu()" />
      <div class="poka-drawer-logo">
        <h1>PokaPlayer</h1>
      </div>
      <v-spacer />
      <v-btn icon @click="switch_audio_order">
        <v-icon class="material-icons-outlined" v-if="audio_order==='list'">repeat</v-icon>
        <v-icon class="material-icons-outlined" v-else>shuffle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      :mobile-breakpoint="960"
      app
    >
      <div class="poka-drawer-logo">
        <h1>PokaPlayer</h1>
      </div>
      <v-divider style="margin: 0px 0;" />
      <div class="poka list">
        <template v-for="item in items">
          <v-divider v-if="item.divider" :key="item.text" style="margin: 4px 0;" />
          <router-link
            class="item"
            v-else
            v-ripple
            :to="item.to"
            :key="item.text"
            active-class="active"
          >
            <div class="content">
              <v-icon
                class="material-icons-outlined"
                :color="$vuetify.theme.isDark?'#FFF':'primary'"
                v-text="item.icon"
              />
              <div class="header">
                <div class="head">{{ item.text }}</div>
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </v-navigation-drawer>
    <v-main>
      <div class="router-view">
        <router-view />
      </div>
      <div style="height:69px"></div>
    </v-main>
    <div class="bottom-player">
      <div class="app-progress-bar">
        <v-slider
          min="0"
          max="100"
          step="0.000001"
          v-model="audio_currentTimePercent"
          @change="audio_seek"
          hide-details
        ></v-slider>
      </div>
      <div class="song-info">
        <div class="left">
          <div class="cover">
            <v-fade-transition mode="out-in">
              <img :src="audio_cover" :key="audio_cover" />
            </v-fade-transition>
          </div>
          <div class="song-title" @click="$router.push($route.path!='/now'?'/now':'/lyric')">
            <div class="song-name">{{audio_title}}</div>
            <div class="song-artist">{{audio_artist||$t('app_waitForPlay')}}</div>
          </div>
        </div>
        <div class="center">
          <span class="time">{{audio_currentTime}}</span>

          <v-btn icon @click="audio_previous">
            <v-icon class="material-icons-outlined">skip_previous</v-icon>
          </v-btn>

          <v-btn small fab depressed @click="audio_toggle" color="primary">
            <v-icon class="material-icons-outlined" key="play" v-if="audio_paused">play_arrow</v-icon>
            <v-icon class="material-icons-outlined" key="pause" v-else>pause</v-icon>
          </v-btn>

          <v-btn icon @click="audio_next">
            <v-icon class="material-icons-outlined">skip_next</v-icon>
          </v-btn>

          <span class="time">{{audio_totalTime}}</span>
        </div>
        <div class="right" v-if="audio_artist">
          <div
            :style="`display: flex;padding: 20px 0;min-width: 160px;justify-content: flex-end;`"
            @mouseover="audio_volume_hover=true"
            @mouseleave="audio_volume_hover=false"
          >
            <v-fade-transition>
              <v-slider
                v-show="audio_volume_hover"
                v-model="audio_volume"
                hide-details
                style
                thumb-label
              ></v-slider>
            </v-fade-transition>
            <v-btn icon @click="audio_volume?audio_volume=0:audio_volume=100">
              <v-icon class="material-icons-outlined" v-if="audio_volume==0">volume_off</v-icon>
              <v-icon class="material-icons-outlined" v-else-if="audio_volume<50">volume_down</v-icon>
              <v-icon class="material-icons-outlined" v-else>volume_up</v-icon>
            </v-btn>
          </div>
          <v-btn icon @click="switch_audio_order">
            <v-icon class="material-icons-outlined" v-if="audio_order==='list'">repeat</v-icon>
            <v-icon class="material-icons-outlined" v-else>shuffle</v-icon>
          </v-btn>
          <v-btn icon to="/now" v-if="$route.path!='/now'">
            <v-icon class="material-icons-outlined">playlist_play</v-icon>
          </v-btn>
          <v-btn icon to="/lyric" v-else>
            <v-icon class="material-icons-outlined">subtitles</v-icon>
          </v-btn>
        </div>
        <div class="right" v-else>
          <play-random-button />
        </div>
        <div class="right-s" v-if="audio_artist">
          <v-btn icon @click="audio_previous">
            <v-icon class="material-icons-outlined">skip_previous</v-icon>
          </v-btn>

          <v-btn small fab depressed @click="audio_toggle" color="primary">
            <v-icon class="material-icons-outlined" key="play" v-if="audio_paused">play_arrow</v-icon>
            <v-icon class="material-icons-outlined" key="pause" v-else>pause</v-icon>
          </v-btn>

          <v-btn icon @click="audio_next">
            <v-icon class="material-icons-outlined">skip_next</v-icon>
          </v-btn>
        </div>
        <div class="right-s" v-else>
          <play-random-button />
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
    drawer: null,
    audio_interval: null,
    audio_currentTimePercent: 100,
    audio_bufferPercent: 100,
    audio_currentTime: "0:00",
    audio_totalTime: "0:00",
    audio_paused: true,
    audio_recored: false,
    audio_cover: _setting(`headerBgSource`),
    audio_title: "PokaPlayer",
    audio_artist: null,
    audio_order: _player.options.order,
    audio_volume: 100,
    audio_volume_hover: false,
    scrollPositions: {},
    settings: { darkMode: window._setting("darkMode") },
    items: [
      { icon: "home", text: i18n.t("home"), to: "/home" },
      { icon: "playlist_play", text: i18n.t("nowplaying"), to: "/now" },
      { icon: "subtitles", text: i18n.t("lrc"), to: "/lyric" },
      { divider: true },
      { icon: "search", text: i18n.t("search"), to: "/search" },
      { icon: "album", text: i18n.t("album"), to: "/album" },
      { icon: "folder", text: i18n.t("folder"), to: "/folder" },
      { icon: "keyboard_voice", text: i18n.t("artist"), to: "/artist" },
      { icon: "edit", text: i18n.t("composer"), to: "/composer" },
      { icon: "video_library", text: i18n.t("playlist"), to: "/playlist" },
      { divider: true },
      { icon: "settings", text: i18n.t("settings"), to: "/settings" }
    ]
  }),
  watch: {
    audio_volume(val) {
      _player.volume(val / 100, true);
    }
  },
  destroyed() {
    if (this.audio_interval) clearInterval(this.audio_interval);
  },
  created() {
    // 狀態欄顏色
    document.getElementsByTagName("meta")["theme-color"].content = this.$vuetify
      .theme.isDark
      ? "rgb(47, 43, 62)"
      : "rgb(245, 245, 245)";
    function vhResize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    window.addEventListener("resize", vhResize);
    vhResize();
    this.drawer = this.$vuetify.breakpoint.mdAndUp;
    this.$router.beforeEach((to, from, next) => {
      let el = document.querySelector("main");
      if (el) this.scrollPositions[from.name] = el.scrollTop;
      next();
      this.$nextTick(() => {
        let currentRouteName = this.$router.history.current.name;
        if (el && currentRouteName in this.scrollPositions) {
          let positions = this.scrollPositions[currentRouteName];
          setTimeout(() => (el.scrollTop = positions), 100);
        }
      });
    });
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.baseURL = _setting(`server`);
    this.getStatus();
    //login socket
    _socket.emit("login", {
      username: window._setting(`username`),
      password: window._setting(`password`)
    });
    _socket.emit("send-nickname", _setting("nickname"));
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        _player.toggle();
        navigator.mediaSession.playbackState = "playing";
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        _player.pause();
        navigator.mediaSession.playbackState = "paused";
      });
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        _player.skipBack()
      );
      navigator.mediaSession.setActionHandler("nexttrack", () =>
        _player.skipForward()
      );
      try {
        navigator.mediaSession.setActionHandler("seekto", event => {
          _player.seek(event.seekTime);
          this.updatePositionState();
        });
      } catch (error) {
        console.warn(
          'Warning! The "seekto" media session action is not supported.'
        );
      }
    }
    this.audio_interval = setInterval(() => {
      let currentTime = _player.audio.currentTime || 0,
        totalTime = _player.audio.duration || 0;
      this.audio_paused = _player.paused;
      this.audio_order = _player.options.order;
      if (_player.list.audios.length > 0) {
        let { name: title, artist, album, cover } = _player.list.audios[
          _player.list.index
        ];
        if (this.audio_title != title) {
          this.audio_recored = false;
          // mediaSession
          if ("mediaSession" in navigator) {
            //寫入 mediaSession.metadata
            navigator.mediaSession.metadata = new MediaMetadata({
              title,
              artist,
              album,
              artwork: [{ src: cover }]
            });
            this.updatePositionState();
          }
        }
        let buffered = _player.audio.buffered;
        let audioBuffered =
          currentTime > 1
            ? (buffered.end(buffered.length - 1) / totalTime) * 100
            : 0;
        let cent = (currentTime / totalTime) * 100;
        this.audio_currentTimePercent = cent;
        this.audio_bufferPercent = audioBuffered;
        this.audio_title = title;
        this.audio_artist = artist;
        this.audio_cover = cover;
        this.audio_currentTime = this.secondToTime(currentTime);
        this.audio_totalTime = this.secondToTime(totalTime);
        this.updatePositionState();
        // record
        if (
          totalTime &&
          currentTime + 10 > totalTime &&
          !this.audio_recored &&
          window._setting("dataRecord")
        ) {
          this.audio_recored = true;
          this.axios.post(
            `${_setting("server")}/pokaapi/v2/record/add`,
            _player.list.audios[_player.list.index]
          );
        }
      } else {
        this.audio_currentTime = "0:00";
        this.audio_totalTime = "0:00";
        this.audio_currentTimePercent = 100;
        this.audio_bufferPercent = 100;
        this.audio_title = "PokaPlayer";
        this.audio_artist = null;
        this.audio_recored = false;
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
    updatePositionState() {
      if ("setPositionState" in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: _player.audio.duration || 0,
          playbackRate: 1,
          position: _player.audio.currentTime || 0
        });
      }
    },
    audio_toggle() {
      if (_player.list.audios.length > 0) {
        _player.toggle();
        this.audio_paused = _player.paused;
      } else {
        this.$randomPlay();
      }
    },
    audio_next() {
      _player.skipForward();
      _player.play();
    },
    audio_previous() {
      _player.skipBack();
      _player.play();
    },
    audio_seek() {
      _player.seek(
        (this.audio_currentTimePercent / 100) * _player.audio.duration
      );
    },
    closeMenu() {
      this.drawer = false;
    },
    toggleMenu() {
      this.drawer = !this.drawer;
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
    async getStatus() {
      // getStatus
      let response = await this.axios.get(_setting(`server`) + "/status/");
      // 沒登入滾回登入頁面
      if (!response.data.login) return this.$router.push("/login");
      // 標記為已登入
      let userProfile = await this.axios.get(
        _setting(`server`) + "/pokaapi/v2/user/"
      );
      sessionStorage.setItem("login", JSON.stringify(userProfile.data));
      // sync settings
      let settings = JSON.parse(userProfile.data.settings);
      for (let i of Object.keys(settings)) {
        _setting(i, settings[i]);
      }
      // add admin page
      if (userProfile.data.role == "admin") {
        let debugItem = {
          icon: "admin_panel_settings",
          text: i18n.t("settingIndex.adminItems"),
          to: "/admin"
        };
        if (!this.items.filter(x => x.text == "Admin").length) {
          this.items.push(debugItem);
        }
      }
      // add debug page
      if (response.data.debug) {
        let debugItem = { icon: "bug_report", text: "Debug", to: "/debug" };
        if (!this.items.filter(x => x.text == "Debug").length) {
          this.items.push(debugItem);
        }
      }
    }
  }
};
</script>
<style lang="sass" scoped>
nav
	.v-list-item
		.material-icons:not(.material-icons-outlined)
			display: none
		&.v-item--active
			.material-icons:not(.material-icons-outlined)
				display: block
			.material-icons-outlined
				display: none
main
	height: calc(var(--vh,1vh) * 100)
	overflow: hidden
	overflow-y: scroll
	margin-bottom: -64px

.v-navigation-drawer:not(.v-navigation-drawer--is-mobile)
	height: calc(var(--vh,1vh) * 100 - 64px) !important
.poka-drawer-logo
	padding: 0 16px
	font-family: var(--product-font)
	h1
		font-size: 24px
		line-height: 56px

nav
	.poka.list
		.item,.item.active:before
			border-radius: 0

@media (min-width: 576px)
	.router-view
		padding: 16px

.v-app-bar
	box-shadow: inset 0 -1px 0 0 #dadce0
@media (prefers-color-scheme: dark)
	.v-app-bar
		box-shadow: inset 0 -1px 0 0 hsla(0,0%,100%,.12)

.bottom-player
	box-sizing: border-box
	height: 64px
	max-height: 64px
	backdrop-filter: blur(4px)
	z-index: 99
	position: fixed
	background-color: rgba(245, 245, 245, 0.7)

	--cover-size: 56px
	@media (prefers-color-scheme: dark)
		&
			background-color: rgba(47, 43, 62, 0.7)
	.app-progress-bar
		margin: -16px -8px
	.song-info
		display: grid
		grid-gap: 10px
		grid-template-columns: .5fr 250px .5fr
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
					line-height: 24px
				.song-name
					font-weight: bold
			.cover
				margin: 0 8px
				height: var(--cover-size)
				min-width: var(--cover-size)
				background-size: cover
				background-position: center
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
@media screen and (min-width: 768px)
	.bottom-player .song-info .left
		.song-title
			margin-left: calc(var(--cover-size) * 1.5 + 16px)
		.cover
			position: absolute
			bottom: 4px
			left: 0px
			transform: scale(1.5)
			transform-origin: left bottom
			z-index: 3
			box-shadow: 0 0 15px #00000033
@media screen and (max-width: 600px)
	.bottom-player
		.song-info
			grid-template-columns: 1fr 144px
			.center,.right
				display: none
			.right-s
				display: flex
</style>
