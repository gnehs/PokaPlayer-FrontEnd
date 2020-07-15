<template>
	<div>
		<poka-update />
		<div class="poka-notify">
			<h1>歡迎來到設定頁面</h1>
			<p style="margin-bottom:0">請使用選單來檢視設定項目。</p>
		</div>
		<h1>{{$t('settings_about')}}</h1>
		<v-list subheader>
			<v-list-item>
				<v-list-item-avatar>
					<v-icon>info</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>PokaPlayer</v-list-item-title>
					<v-list-item-subtitle>{{poka_version}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider />
			<v-list-item href="https://github.com/gnehs/PokaPlayer/" target="_blank">
				<v-list-item-avatar>
					<v-icon>explore</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>GitHub</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item href="https://github.com/gnehs/PokaPlayer/graphs/contributors" target="_blank">
				<v-list-item-avatar>
					<v-icon>group</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{$t("settings_about_contributions")}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item href="https://github.com/gnehs/PokaPlayer/issues" target="_blank">
				<v-list-item-avatar>
					<v-icon>error</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{$t("settings_about_errorEeport")}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-dialog v-model="aboutDialog" max-width="350">
			<poka-about />
		</v-dialog>
	</div>
</template>
<script>
export default {
	name: "Setting",
	created() {
		this.axios.get(_setting(`server`) + "/status/").then(response => {
			if (!response.data.version) this.$router.push("/login");
			this.poka_version = response.data.version;
		});
	},
	data: () => ({
		settings: { darkMode: window._setting("darkMode") },
		aboutDialog: false,
		poka_version: "Loading..."
	})
};
</script>