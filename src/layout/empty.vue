<template>
	<router-view />
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
