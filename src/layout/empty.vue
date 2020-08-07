<template>
	<div>
		<router-view />
	</div>
</template>
<script>
import Vue from "vue";
export default {
	name: "App",
	data: () => ({
		snackbar: { show: false, message: ``, timeout: null },
	}),
	created() {
		// 狀態欄顏色
		document.getElementsByTagName('meta')["theme-color"].content = this.$vuetify.theme.isDark ? "rgb(47, 43, 62)" : "rgb(245, 245, 245)"
	}
};
</script>