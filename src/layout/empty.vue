<template>
	<div>
		<md-app>
			<md-app-content>
				<router-view />
			</md-app-content>
		</md-app>
	</div>
</template>
<script>
export default {
	name: "App"
};
</script>
<style lang="sass" scoped>
.md-app-content
	overflow-y: auto
	overflow-x: hidden
.md-app
	min-height: calc(var(--vh, 1vh) * 100)
	max-height: calc(var(--vh, 1vh) * 100)
</style>
