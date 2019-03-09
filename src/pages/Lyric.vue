<template>
  <div>
    <div v-if="!noloadedLyric"></div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: "Lyrics",
  data: () => ({
    audio_title: null,
    audio_artist: null,
    noloadedLyric: true,
    lyric: null,
    Lyric_updatePlayer: null
  }),
  created() {
    this.updateLyric();
    this.startUpdateLyric();
  },
  destroyed() {
    this.stopUpdateLyric();
  },
  methods: {
    startUpdateLyric() {
      this.Lyric_updatePlayer = setInterval(() => this.updatePlayer(), 400);
    },
    stopUpdateLyric() {
      if (this.Lyric_updatePlayer) {
        clearInterval(this.Lyric_updatePlayer);
      }
    },
    updateLyric() {
      let nowPlaying = _player.list.audios[_player.list.index];
      if (_player.list.audios.length > 0) {
        if (this.audio_title != nowPlaying.name) {
          //找歌詞囉
          this.getLyric(
            nowPlaying.name,
            nowPlaying.artist,
            nowPlaying.id,
            nowPlaying.source
          );
        } else {
          //更新時間就好
        }
      } else {
        this.noloadedLyric = true;
      }
    },
    getLyric: async (title, artist, id = false, source) => {
      let lyricRegex = /\[([0-9.:]*)\]/i;
      this.noloadedLyric = true;
      this.lyric = null;
      let response, url;
      if (id) {
        url =
          _setting(`server`) +
          `/pokaapi/lyric/?moduleName=${encodeURIComponent(
            source
          )}&id=${encodeURIComponent(id)}`;
        response = await this.axios.get(url);
        if (
          response.data.lyrics[0].lyric &&
          response.data.lyrics[0].lyric.match(lyricRegex)
        ) {
          window._lrc.load(result.data.lyrics[0].lyric);
          this.noloadedLyric = false;
          this.lyric = window._lrc.getLyrics();
          return; //透過 id 找到歌詞ㄌ
        }
      }
      response = (await this.axios.get(
        `/pokaapi/searchLyrics/?keyword=${encodeURIComponent(
          title + " " + artist
        )}`
      )).data;

      if (result.lyrics[i]) {
        let lrcTitle = result.lyrics[i].name
          .toLowerCase()
          .replace(/\.|\*|\~|\&|。|，|\ |\-|\!|！|\(|\)/g, "");
        let songTitle = title
          .toLowerCase()
          .replace(/\.|\*|\~|\&|。|，|\ |\-|\!|！|\(|\)/g, "");
        if (lrcTitle == songTitle && result.lyrics[i].lyric.match(lyricRegex))
          return result.lyrics[i].lyric;
      }
      this.lyric = window._lrc.getLyrics();
    }
  }
};
</script>
<style lang="sass" scoped>
</style>