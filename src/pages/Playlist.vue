<template>
  <div>
    <portal to="app-bar" v-if="$route.name == 'PlaylistFolder'">
      <v-app-bar
        color="#FFF"
        clipped-left
        app
        :style="`box-shadow: 0px 0px 0px 1px ${$vuetify.theme.isDark ? 'rgba(255, 255, 255, 0.12)' : `rgb(0 0 0 / 20%)`}`"
      >
        <back icon to="/playlist" />
        <v-toolbar-title v-show="!showSeachBar || $vuetify.breakpoint.mdAndUp">{{ title }}</v-toolbar-title>
        <v-spacer />
        <poka-searchbar v-model="showSeachBar" />
      </v-app-bar>
    </portal>
    <poka-header :title="$route.name == 'PlaylistFolder' ? '' : title" :bg="cover" />
    <v-slide-y-reverse-transition>
      <poka-parse-playlists v-if="data" :data="data" />
    </v-slide-y-reverse-transition>
    <poka-loader v-if="!data" />
  </div>
</template>

<script>
const GeoPattern = require('geopattern')
export default {
  name: 'Playlist',
  watch: {
    '$route.path': function(val, oldVal) {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  data: () => ({
    data: null,
    rawData: null,
    cover: null,
    title: i18n.t('playlist'),
    showSeachBar: false
  }),
  methods: {
    async fetchData() {
      let routerParams = this.$route.params.pathMatch,
        routerNames = this.$route.name
      this.data = null
      if (!this.rawData) {
        this.rawData = (await this.axios(_setting(`server`) + `/pokaapi/playlists`)).data.playlists
      }
      if (routerNames == 'PlaylistFolder') {
        this.title = this.rawData.filter(x => x.id == routerParams)[0].name
        this.data = this.rawData.filter(x => x.id == routerParams)[0].playlists
        this.cover = GeoPattern.generate(this.title, {
          baseColor: '#fc0'
        }).toDataUri()
      } else {
        this.title = i18n.t('playlist')
        this.data = this.rawData
        this.cover = _setting(`headerBgSource`)
      }
    }
  }
}
</script>
