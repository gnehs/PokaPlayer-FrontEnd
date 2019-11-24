<template>
	<v-app class="page-container">
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</v-app>
</template>
<style lang="sass">
@import "@/assets/pokaList.sass"
@import "@/assets/main.sass"
@import "@/assets/scrollbar.scss"
</style>
<style lang="scss">
	@import "~vue-material/dist/theme/engine"; // Import the theme engine
	@include md-register-theme(
		"default",
		(
			primary: rgb(98, 0, 238),
			accent: #cc005f
		)
	);
	@import "~vue-material/dist/theme/all"; // Apply the theme
	@include md-register-theme(
		"default-dark",
		(
			primary: md-get-palette-color(blue, 100),
			accent: md-get-palette-color(blue, A200),
			theme: dark
		)
	);
	@import "~vue-material/dist/theme/all"; // Apply the theme
	.page-container {
		overflow: hidden;
		height: 100vh;
		width: 100vw;
	}
	*.md-theme-default-dark {
		--md-theme-default-dark-background: rgb(31, 31, 31);
		--md-theme-default-dark-divider-on-background: rgba(255, 255, 255, 0.12);
	}
</style>