<template lang="pug">
.header-wrapper
	.bg2
	.bg(:style=`{backgroundImage: 'url("'+bg+'")'}`)
	.title(style="max-width: 950px !important;")
		.title(style="line-height: normal;") {{title}}
		.subtitle {{subtitle}}
</template>

<script>
export default {
  name: "headerWrapper",
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    bg: {
      type: String,
      default: "https://area.sinaapp.com/bingImg/"
    }
  }
};
</script>
<style lang="sass" scoped>
.header-wrapper
	width: calc(100% + 16px * 2)
	overflow: hidden
	position: relative
	margin: -16px
	margin-bottom: -300px
	&.hide
		display: none
	.bg, .bg2
		transform: scale(1.05)
		min-height: 350px
		background-size: cover
		background-position: center
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 10%, transparent 90%)
		-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 10%, transparent 90%)
		width: 100%
	.bg.blur
		filter: blur(5px)
	.bg2
		position: absolute
		&.blur
			filter: blur(5px)
		&:not(.changeing)
			opacity: 0
	.bg.changeing
		animation: fade .4s linear
	.bg2.changeing
		animation: fade .4s linear reverse
	> .title
		font-weight: bold
		margin-top: -300px
		margin-bottom: 340px
		margin-left: 32px
		z-index: 3
		position: relative
	.title
		.title
			font-size: 3.5em
		.subtitle
			font-size: 1.5em
	+ .mdui-tab
		margin-top: -32px
		margin-bottom: 32px
	&.hide + #content
			padding-top: 64px

@keyframes fade
	0%
		opacity: 0
	100%
		opacity: 1
</style>