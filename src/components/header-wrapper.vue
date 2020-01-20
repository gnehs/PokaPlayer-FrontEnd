<template lang="pug">
div(style="position: sticky;top: 15px;")
	.header-wrapper
		.bg(:style=`{backgroundImage: 'url("'+bg+'")'}`,:class="{blur: blurbg}")
	.hw-header(v-if='title',:style="headerStyle")
		.hw-title(style="line-height: normal;") {{title}}
		.hw-subtitle {{subtitle}}
</template>

<script>
export default {
	name: "poka-header",
	data: () => ({
		headerStyle: {
			opacity: 1
		}
	}),
	props: {
		title: String,
		subtitle: String,
		bg: {
			type: String,
			default: _setting(`headerBgSource`)
		},
		blurbg: { type: Boolean, default: false }
	},
	methods: {
		handleScroll(event) {
			let scrollTop = document.querySelector('main').scrollTop;
			let targetHideHeight = 130
			this.headerStyle.opacity = scrollTop > targetHideHeight ? 0 : (scrollTop > 20 ? 1 - scrollTop / targetHideHeight : 1)
		}
	},
	mounted() {
		document.querySelector('main').addEventListener('scroll', this.handleScroll);
	},
	created() {		this.handleScroll()
		document.querySelector('main').addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		document.querySelector('main').removeEventListener('scroll', this.handleScroll);
	}
};
</script>
<style lang="sass">
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
		min-height: calc( 100vh - 69px - 64px )
		overflow: hidden
	.bg.blur
		filter: blur(5px)
.hw-header
	font-weight: bold
	margin-left: 16px
	margin-top: 32px
	margin-bottom: 32px
	position: relative
	font-family: var(--product-font)
	>.hw-title,>.hw-subtitle
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
		line-height: 1.1em
	>.hw-title
		font-size: 3.5em
	>.hw-subtitle
		font-size: 1.5em
</style>