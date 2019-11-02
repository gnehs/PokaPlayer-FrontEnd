<template lang="pug">
div
	.header-wrapper
		.bg(:style=`{backgroundImage: 'url("'+bg+'")'}`,:class="{blur: blurbg}")
	.header(v-if='title')
		.title(style="line-height: normal;") {{title}}
		.subtitle {{subtitle}}
</template>

<script>
export default {
	name: "poka-header",
	props: {
		title: String,
		subtitle: String,
		bg: {
			type: String,
			default: _setting(`headerBgSource`)
		},
		blurbg: { type: Boolean, default: false }
	}
};
</script>
<style lang="sass" scoped>
.header-wrapper
	width: 100%
	position: relative
	min-height: 1px
	margin-top: -1px
	pointer-events: none
	.bg
		transform: scale(1.12)
		background-size: cover
		background-position: center
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 100%)
		-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 100%)
		width: 100%
		position: absolute
		min-height: 300px
	.bg.blur
		filter: blur(5px)
.header
	font-weight: bold
	margin-left: 16px
	margin-top: 32px
	margin-bottom: 32px
	position: relative
	font-family: var(--product-font)
	>.title,>.subtitle
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
		line-height: 1.1em
	>.title
		font-size: 3.5em
	>.subtitle
		font-size: 1.5em
</style>