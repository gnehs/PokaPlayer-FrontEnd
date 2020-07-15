<template>
	<div>
		<div class="poka-notify">
			<h1>歡迎來到設定頁面</h1>
			<p style="margin-bottom:0">請使用選單來檢視設定項目。</p>
		</div>
		<poka-update />
		<poka-cards class="poka cards" :hide-overflow="false">
			<poka-card
				poka-icon="music_note"
				:ellipsis="false"
				poka-title="PokaPlayer"
				:poka-subtitle="poka_version"
			/>
			<poka-card
				href="https://github.com/gnehs/PokaPlayer/"
				target="_blank"
				poka-icon="explore"
				:ellipsis="false"
				poka-title="GitHub"
			/>
			<poka-card
				href="https://github.com/gnehs/PokaPlayer/graphs/contributors"
				target="_blank"
				poka-icon="group"
				:ellipsis="false"
				:poka-title="$t('settings_about_contributions')"
			/>
			<poka-card
				href="https://github.com/gnehs/PokaPlayer/issues"
				target="_blank"
				poka-icon="error"
				:ellipsis="false"
				:poka-title="$t('settings_about_errorEeport')"
			/>
		</poka-cards>
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
		poka_version: "Loading..."
	})
};
</script>