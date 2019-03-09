<template>
  <div>
    <div v-if="lyric.length>0">
      <p v-for="(item, index) of lyric" :key="index">{{item.text}}</p>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: "Lyrics",
  data: () => ({
    audio_title: null,
    audio_artist: null,
    lyric: [],
    Lyric_Update: null
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
      this.Lyric_Update = setInterval(() => this.updateLyric(), 400);
    },
    stopUpdateLyric() {
      if (this.Lyric_Update) {
        clearInterval(this.Lyric_Update);
      }
    },
    updateLyric() {
      let nowPlaying = _player.list.audios[_player.list.index];
      if (_player.list.audios.length > 0) {
        if (this.audio_title != nowPlaying.name) {
          //找歌詞囉
          window._lrc.load(`[00:00.000]`);
          this.getLyric(
            nowPlaying.name,
            nowPlaying.artist,
            nowPlaying.id,
            nowPlaying.source
          );
          this.audio_title = nowPlaying.name;
        } else {
          this.lyric = window._lrc.getLyrics();
          //更新時間就好
        }
      } else {
        this.noloadedLyric = true;
      }
    },
    getLyric(title, artist, id = false, source) {
      let lyricRegex = /\[([0-9.:]*)\]/i;
      let response, url;
      if (id) {
        url =
          _setting(`server`) +
          `/pokaapi/lyric/?moduleName=${encodeURIComponent(
            source
          )}&id=${encodeURIComponent(id)}`;

        axios(url).then(response => {
          if (
            response.data.lyrics[0].lyric &&
            response.data.lyrics[0].lyric.match(lyricRegex)
          ) {
            //透過 id 找到歌詞ㄌ
            loadLrc(response.data.lyrics[0].lyric);
          } else {
            //沒找到，拿 title 跟 artist 找找看
            getLyricByKeyword(title, artist);
          }
        });
      } else {
        getLyricByKeyword(title, artist);
      }
      function getLyricByKeyword(title, artist) {
        axios(
          _setting(`server`) +
            `/pokaapi/searchLyrics/?keyword=${encodeURIComponent(
              title + " " + artist
            )}`
        )
          .then(result => result.data)
          .then(result => {
            // console.log(result);
            for (let { name, lyric } of result.lyrics) {
              let lrcTitle = name
                .toLowerCase()
                .replace(/\.|\*|\~|\&|。|，|\ |\-|\!|！|\(|\)/g, "");
              let songTitle = title
                .toLowerCase()
                .replace(/\.|\*|\~|\&|。|，|\ |\-|\!|！|\(|\)/g, "");
              if (lrcTitle == songTitle && lyric.match(lyricRegex)) {
                loadLrc(lyric);
              }
            }
          });
      }
      function loadLrc(lrc) {
        window._lrc.load(lrc);
      }
    }
  }
};
</script>
<style lang="sass" scoped>
</style>