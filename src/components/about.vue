<template>
	<div class="box">
		<div class="content">
			<img src="/static/img/icons/512x512.png" style="height: 128px">
			<h1>PokaPlayer</h1>
			<p class="md-subheading">{{poka_version}}</p>
			<a href="https://github.com/gnehs/PokaPlayer/" target="_blank">GitHub</a>
			<span>．</span>
			<a
				href="https://github.com/gnehs/PokaPlayer/issues"
				target="_blank"
			>{{$t("settings_about_errorEeport")}}</a>
			<span>．</span>
			<a
				href="https://github.com/gnehs/PokaPlayer/graphs/contributors"
				target="_blank"
			>{{$t('settings_about_contributions')}}</a>
		</div>
	</div>
</template>

<style lang="sass" scoped>
.box   
	display: grid
	justify-content: center
	align-items: center
	height: calc(100% - 69px)
.content
	text-align: center
</style>
<script>
export default {
	name: "poka-about",
	data: () => ({
		poka_version: "Loading..."
	}),
	created() {
		this.axios.get(_setting(`server`) + "/info/").then(response => {
			if (!response.data.version) this.$router.push("/login");
			this.poka_version = response.data.version;
		});
	}
};
</script>