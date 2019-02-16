<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">PokaPlayer</span>
          </div>
          <md-autocomplete
            class="search"
            v-model="searchKeyword"
            :md-options="coins"
            md-layout="box"
          >
            <label>{{$t("search")}}</label>
          </md-autocomplete>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>refresh</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
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
          <md-divider/>
          <md-list-item to="/setting">
            <md-icon class="outline-settings"></md-icon>
            <span class="md-list-item-text">{{$t("settings")}}</span>
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
    menuVisible: false,
    searchKeyword: null,
    coins: ["可愛幣幣", "開心幣幣", "傷心幣幣", "吼吼幣幣"]
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: #5c8565,
    accent: #1a11e8
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
<style lang="sass" scoped>
	.md-app 
		min-height: 100vh

	.md-drawer 
		width: 230px
		max-width: calc(100vw - 125px)
	
	.md-list .md-icon
		opacity: .54

</style>
<style>
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