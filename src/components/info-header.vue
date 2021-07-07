<template>
  <div class="info-header">
    <div class="cover" :style="`background-image: url('${cover}')`" />
    <div class="info-data">
      <div class="album-name" :title="title">{{title}}</div>
      <div class="artist-name" :title="subtitle">{{subtitle}}</div>
      <div class="grow"></div>
      <div class="footer">
        <v-fade-transition>
          <div class="time" v-if="songs" :key="songs">{{$t("album_total", { songs: songs })}}</div>
        </v-fade-transition>
        <div class="actions">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "info-header",
  props: {
    cover: String,
    title: String,
    subtitle: String,
    songs: { default: 0 }
  },
  data: () => ({}),
  created() {}
};
</script>

<style lang="sass" scoped>
/* 專輯歌曲頁面 - 專輯簡介 */
.info-header
	position: relative
	margin-top: 16px
	padding: 16px
	display: flex
	flex-direction: row
	flex-wrap: wrap
	*
		transition: all .3s ease
	&>.cover
		height: 200px
		width: 200px
		align-content: center
		flex-direction: column
		background-size: cover
		background-position: center
		border-radius: 16px
		box-shadow: 0 10px 15px #0000002e
	&>.info-data
		flex: 1
		flex-direction: column
		display: flex
		padding-left: 24px
		padding-right: 24px
		overflow: hidden
		>.album-name,>.artist-name
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
		>.album-name
			font-size: 2em
			line-height: 1.5em
			font-weight: bold
		>.artist-name
			font-size: 1.5em
			line-height: 1.5em
		>.grow
			flex: 1
		>.footer
			display: flex
			flex-direction: row
			flex-wrap: wrap
			>.time
				flex: 1
		.time
			font-size: 20px
			line-height: 42px
		.actions
			.v-btn
				height: 42px
				min-width: 42px
				width: 42px

@media screen and (max-width: 768px)
	.info-header
		>.cover
			height: 150px
			width: 150px
		>.info-data
			padding-left: 12px
			padding-right: 0
			font-size: 12px
		.time
			font-size: 18px !important
</style>