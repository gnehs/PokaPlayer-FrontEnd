<template>
  <v-btn outlined color="primary" @click="randomPlay" :disabled="loadingRandom">
    <span v-if="!loadingRandom">{{$t('playlist_random')}}</span>
    <span v-else>{{$t('loading')}}</span>
  </v-btn>
</template>

<script>
export default {
  name: "play-random-button",
  data: () => ({
    loadingRandom: false
  }),
  methods: {
    randomPlay() {
      this.loadingRandom = true;
      try {
        this.$randomPlay();
      } catch {
        this.loadingRandom = false;
      }
    }
  }
};
</script>