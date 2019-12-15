<template>
	<v-card class="mx-auto" width="350">
		<v-img class="poka-logo-banner" src="/img/loginHeader.svg" height="170px"></v-img>
		<v-card-text class="text-center">
			<br />
			<span class="display-1">PokaPlayer</span>
			<br />
			<span class="subtitle-1">{{' '+poka_version}}</span>
			<br />
			<br />
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
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "poka-about",
	data: () => ({
		poka_version: "Loading..."
	}),
	created() {
		this.axios.get(_setting(`server`) + "/status/").then(response => {
			if (!response.data.version) this.$router.push("/login");
			this.poka_version = response.data.version;
		});
	}
};
</script>