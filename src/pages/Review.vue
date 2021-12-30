<template>
  <div>
    <div class="review-block">
      <div class="text-center">
        <h1 class="text-h1 font-weight-thin">{{ $t('review.page.title') }}</h1>
        <h1 class="text-h3 font-weight-thin">{{ $t('review.page.subtitle', { year }) }}</h1>
      </div>
    </div>

    <poka-loader v-if="!data" style="margin-top: 64px;" />
    <div v-if="data">
      <!-- <div class="review-block">
        <h1 class="text-h4 review-title">嘿</h1>
        <p>去年你一共在 PokaPlayer 聽了 {{ data.total }} 首歌，在 {{ data.days[0]._id }} 聽了最多首歌，居然有 {{ data.days[0].count }} 首！</p>
      </div>-->
      <div class="review-block">
        <h1 class="text-h4 review-title mb-4">{{ $t('review.page.mostPlayedSongs') }}</h1>
        <poka-parse-songs :data="data.songs" />
      </div>
      <div class="review-block">
        <h1 class="text-h4 review-title mb-4">{{ $t('review.page.mostPlayedAlbums') }}</h1>
        <poka-parse-albums :data="data.albums" />
      </div>
      <div class="review-block">
        <h1 class="text-h4 review-title mb-4">{{ $t('review.page.mostPlayedArtists') }}</h1>
        <poka-parse-artists :data="data.artists" />
      </div>
      <div class="review-block">
        <h1
          class="text-center text-h3 font-weight-thin review-title"
        >{{ $t('review.page.thankYouTitle') }}</h1>
        <p class="text-center text-h5 font-weight-thin">{{ $t('review.page.thankYouDescription') }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>

.review-block
  margin-bottom: 16px
  width: 100%
  border-radius: 16px
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.1)
  padding: 48px 36px
  background-image: repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 10px ), repeating-linear-gradient( #ececec55, #ececec )
  // dark
  @media (prefers-color-scheme: dark)
    background-image: repeating-radial-gradient( circle at 0 0, transparent 0, #2f2b3e 10px ), repeating-linear-gradient( #2f2b3e55, #2f2b3e )
</style>
<script>
export default {
  name: 'Review',
  data: () => ({
    data: null,
    // get current year
    year: new Date().getFullYear()
  }),
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.data = (await this.axios.get(_setting(`server`) + `/pokaapi/v2/record/review?year=${this.year}`)).data
    }
  }
}
</script>
