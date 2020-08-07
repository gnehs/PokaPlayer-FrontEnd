<template>
	<div>
		<router-view />
		<v-snackbar v-model="snackbar.show">{{snackbar.message}}</v-snackbar>
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
		//註冊點心條組件
		Vue.prototype.$snackbar = (msg = ``, duration = 1500) => {
			this.snackbar.message = msg;
			this.snackbar.show = true;
			clearTimeout(this.snackbar.timeout);
			this.snackbar.timeout = setTimeout(() => (this.snackbar.show = false), duration);
		};
	}
};
</script>