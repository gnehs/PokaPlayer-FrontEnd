<template>
  <div>
    <portal to="app-bar" v-if="type != 'album'">
      <v-app-bar
        color="#FFF"
        clipped-left
        app
        :style="`box-shadow: 0px 0px 0px 1px ${$vuetify.theme.isDark ? 'rgba(255, 255, 255, 0.12)' : `rgb(0 0 0 / 20%)`}`"
      >
        <back icon />
        <v-toolbar-title>{{ name }}</v-toolbar-title>
        <v-spacer />
        <poka-searchbar />
      </v-app-bar>
    </portal>
    <poka-header v-if="type == 'album'" :title="name" :bg="cover" />
    <poka-header v-else :title="$t(type)" blurbg :bg="cover" />
    <library-menu v-if="type == 'album'" />
    <v-slide-y-reverse-transition>
      <poka-parse-albums v-if="data" :data="data.albums" />
    </v-slide-y-reverse-transition>
    <poka-loader v-if="!data" />
  </div>
</template>

<script>
export default {
  name: 'Album',
  created() {
    this.fetchData()
  },
  watch: {
    '$route.path': function() {
      this.fetchData()
    }
  },
  data: () => ({
    data: null,
    cover: null,
    name: null,
    type: null,
    server: _setting(`server`)
  }),
  methods: {
    async fetchData() {
      this.type = this.$route.meta.type
      this.data = null
      this.cover = _setting(`headerBgSource`)

      let url
      let type = this.$route.meta.type
      let { source, id } = this.$route.params
      if (id == 'unknown') id = ''

      if (type == 'album') {
        this.name = this.$t('album')
        url = _setting(`server`) + '/pokaapi/albums/'
      } else {
        this.name = ''
        url = `${this.server}/pokaapi/${type}Albums/?moduleName=${encodeURIComponent(source)}&id=${encodeURIComponent(id)}`
      }
      this.data = (await this.axios.get(url)).data

      //get name & cover
      if (type != 'album') {
        this.axios.get(`/pokaapi/${type}/?moduleName=${encodeURIComponent(source)}&id=${encodeURIComponent(id)}`).then(response => {
          this.cover = _setting(`server`) + response.data.cover
          this.name = response.data.name
        })
      }
    }
  }
}
</script>
