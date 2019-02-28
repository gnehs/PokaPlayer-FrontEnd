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
        <md-list>
          <md-list-item to="/">
            <md-icon class="outline-home"></md-icon>
            <span class="md-list-item-text">{{$t("home")}}</span>
          </md-list-item>

          <md-list-item to="/now">
            <md-icon class="outline-playlist_play"></md-icon>
            <span class="md-list-item-text">{{$t("nowplaying")}}</span>
          </md-list-item>

          <md-divider/>
          <md-list-item to="/search">
            <md-icon class="outline-search"></md-icon>
            <span class="md-list-item-text">{{$t("search")}}</span>
          </md-list-item>
          <md-list-item to="/album">
            <md-icon class="outline-album"></md-icon>
            <span class="md-list-item-text">{{$t("album")}}</span>
          </md-list-item>
          <md-list-item to="/folder">
            <md-icon class="outline-folder"></md-icon>
            <span class="md-list-item-text">{{$t("folder")}}</span>
          </md-list-item>
          <md-list-item to="/artist">
            <md-icon class="outline-mic_none"></md-icon>
            <span class="md-list-item-text">{{$t("artist")}}</span>
          </md-list-item>
          <md-list-item to="/composer">
            <md-icon class="outline-music_note"></md-icon>
            <span class="md-list-item-text">{{$t("composer")}}</span>
          </md-list-item>
          <md-list-item to="/playlist">
            <md-icon class="outline-format_list_bulleted"></md-icon>
            <span class="md-list-item-text">{{$t("playlist")}}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false
  }),
  created() {
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.baseURL = _setting(`server`);
    this.testConnection();
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    testConnection() {
      this.axios
        .get(_setting(`server`) + "info/")
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
    accent: #205374
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
<style lang="sass" scoped>
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
</style>
<style>
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
.search {
  max-width: 500px;
}
</style>