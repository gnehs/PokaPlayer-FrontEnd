<template>
  <div>
    <poka-header :title="$t('artist')" />
    <library-menu />
    <v-slide-y-reverse-transition>
      <poka-parse-artists v-if="data" :data="data.artists" />
    </v-slide-y-reverse-transition>
    <poka-loader v-if="!data" />
  </div>
</template>

<script>
export default {
  name: 'Artist',
  created() {
    this.axios.get(_setting(`server`) + '/pokaapi/artists/').then(response => {
      this.data = response.data
    })
  },
  data: () => ({
    data: null,
    server: _setting(`server`)
  })
}
</script>
