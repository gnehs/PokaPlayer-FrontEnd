<template>
  <div>
    <portal to="app-bar">
      <v-app-bar
        color="#FFF"
        clipped-left
        app
        :style="`box-shadow: 0px 0px 0px 1px ${$vuetify.theme.isDark ? 'rgba(255, 255, 255, 0.12)' : `rgb(0 0 0 / 20%)`}`"
      >
        <back icon />
        <v-toolbar-title>{{ $t('debug') }}</v-toolbar-title>
        <v-spacer />
        <menu-btn />
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tab>Audios</v-tab>
            <v-tab>Config</v-tab>
            <v-tab>Lyric</v-tab>
            <v-tab>Other</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
    </portal>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <pre>{{ audios }}</pre>
      </v-tab-item>
      <v-tab-item>
        <pre>{{ pokaSetting }}</pre>
      </v-tab-item>
      <v-tab-item>
        <pre>{{ lyric }}</pre>
      </v-tab-item>
      <v-tab-item>
        <div class="title">Snackbar</div>
        <v-btn depressed @click="$snackbar('test test 123')">Open Snackbar</v-btn>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'Debug',
  created() {},
  data: () => ({
    tab: null,
    pokaSetting: JSON.parse(localStorage.pokaSetting),
    audios: _player.list.audios,
    lyric: _lrc.lyrics_all
  })
}
</script>
