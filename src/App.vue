<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
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

      <md-app-drawer md-permanent="clipped" :md-active.sync="menuVisible" id="drawer">
        <div class="drawer-list">
          <md-list>
            <md-list-item to="/home" @click="toggleMenu">
              <md-icon class="outline-home"></md-icon>
              <span class="md-list-item-text">{{$t("home")}}</span>
            </md-list-item>

            <md-list-item to="/now" @click="toggleMenu">
              <md-icon class="outline-playlist_play"></md-icon>
              <span class="md-list-item-text">{{$t("nowplaying")}}</span>
            </md-list-item>

            <md-divider/>
            <md-list-item to="/search" @click="toggleMenu">
              <md-icon class="outline-search"></md-icon>
              <span class="md-list-item-text">{{$t("search")}}</span>
            </md-list-item>
            <md-list-item to="/album" @click="toggleMenu">
              <md-icon class="outline-album"></md-icon>
              <span class="md-list-item-text">{{$t("album")}}</span>
            </md-list-item>
            <md-list-item to="/folder" @click="toggleMenu">
              <md-icon class="outline-folder"></md-icon>
              <span class="md-list-item-text">{{$t("folder")}}</span>
            </md-list-item>
            <md-list-item to="/artist" @click="toggleMenu">
              <md-icon class="outline-mic_none"></md-icon>
              <span class="md-list-item-text">{{$t("artist")}}</span>
            </md-list-item>
            <md-list-item to="/composer" @click="toggleMenu">
              <md-icon class="outline-music_note"></md-icon>
              <span class="md-list-item-text">{{$t("composer")}}</span>
            </md-list-item>
            <md-list-item to="/playlist" @click="toggleMenu">
              <md-icon class="outline-format_list_bulleted"></md-icon>
              <span class="md-list-item-text">{{$t("playlist")}}</span>
            </md-list-item>
          </md-list>
        </div>

        <div class="drawer-player">
          <md-divider></md-divider>
          <div class="song-info">
            <div class="cover" :style="`background-image: url('${audio_cover}')`">
              <md-button class="md-icon-button md-mini" @click="audio_toggle">
                <md-icon v-if="audio_paused">play_arrow</md-icon>
                <md-icon v-else>pause</md-icon>
              </md-button>
            </div>
            <div class="info">
              <div class="title">{{audio_title}}</div>
              <div class="artist">{{audio_artist}}</div>
            </div>
            <md-button class="md-icon-button md-mini next" @click="audio_next">
              <md-icon>skip_next</md-icon>
            </md-button>
          </div>
          <md-progress-bar
            class="md-accent"
            md-mode="buffer"
            :md-value="audio_currentTime"
            :md-buffer="audio_buffer"
          ></md-progress-bar>
        </div>
      </md-app-drawer>

      <md-app-content>
        <transition :name="transitionName" mode="out-in">
          <router-view/>
        </transition>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false,
    audio_currentTime: 100,
    audio_buffer: 100,
    audio_paused: true,
    audio_cover: _setting(`randomImgSource`),
    audio_title: "等待播放中",
    audio_artist: "：Ｄ",
    transitionName: "fade"
  }),
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName =
        to.meta.transitionName || from.meta.transitionName || "fade";
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
        // transitionName = toDepth == fromDepth ? "fade" : transitionName; //同一層
      }
      this.transitionName = transitionName;
      next();
    });
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.baseURL = _setting(`server`);
    this.testConnection();
    setInterval(() => {
      let nowPlaying = _player.list.audios[_player.list.index];
      let buffered = _player.audio.buffered;
      let audioBuffered =
          _player.audio.currentTime > 1
            ? (buffered.end(buffered.length - 1) / _player.audio.duration) * 100
            : 0,
        cent = (_player.audio.currentTime / _player.audio.duration) * 100;
      this.audio_currentTime = cent;
      this.audio_buffer = audioBuffered;
      this.audio_paused = _player.paused;
      this.audio_title = nowPlaying.name;
      this.audio_artist = nowPlaying.artist;
      this.audio_cover = nowPlaying.cover;
    }, 1000);
  },
  methods: {
    audio_toggle() {
      _player.toggle();
    },
    audio_next() {
      _player.skipForward();
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    testConnection() {
      this.axios
        .get(_setting(`server`) + "/info/")
        .then(response => {
          console.log(response.data.version);
        })
        .catch(e => this.$router.push("/login"));
    }
  }
};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: #27a09e,
    accent: #767676
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
<style lang="sass" scoped>
.md-toolbar .md-title
  font-family: var(--product-font)
  font-weight: bold
#drawer
  display: flex
  flex-direction: column
  .drawer-list
    flex: 1
    overflow: auto
    max-height: calc(100vh - 70px - 64px)
.drawer-player
  background: rgba(255, 255, 255, 0.3)
  border-radius: 8px
  bottom: 0
  .song-info
    display: flex
    align-items: center
    box-sizing: border-box
    width: 230px
    max-width: 230px
    .cover
      height: 64px
      min-width: 64px
      position: relative
      background-size: cover
      background-position: center
      mask-image: linear-gradient(to right, black 70%, rgba(0,0,0,0) 100%)
      -webkit-mask-image: linear-gradient(to right, black 70%, rgba(0,0,0,0) 100%)
      .md-button
        position: absolute 
        top: 50%
        left: 50%
        transform: translate(-70%, -50%)
        background-color: rgba(255, 255, 255, 0.7)
        opacity: 0
      &:hover .md-button
        opacity: 1
    .info
      flex: 1
      overflow: hidden
      .title,.artist
        padding-left: 2px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        line-height: 24px
      .title
        font-weight: bold
    .md-button.next
      width: 30px
      min-width: 30px
      height: 30px
      margin: 0
  .md-progress-bar
    width: 230px
.md-app-content
  max-height: calc(100vh - 64px)
  overflow-y: auto
  overflow-x: hidden

.md-toolbar, .md-toolbar-row 
    min-height: 64px

.md-app
  min-height: 100vh

.md-drawer 
  width: 230px
  max-width: calc(100vw - 125px)
.router-link-active
  background: rgba(0, 0, 0, 0.05)
</style>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
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
.md-list .md-icon {
  opacity: 0.54;
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

.icon-white {
  -moz-filter: contrast(4) invert(1);
  -o-filter: contrast(4) invert(1);
  -ms-filter: contrast(4) invert(1);
  filter: contrast(4) invert(1);
}
</style>