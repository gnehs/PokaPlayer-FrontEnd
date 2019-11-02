<template>
	<div class="update-notify" v-if="checkUpadteStatus">
		<h1>{{$t('settings_update')}}</h1>
		<p>{{checkUpadteStatus}}</p>
		<md-button
			to="/setting/system"
			class="md-primary md-outlined md-theme-default-dark"
		>{{$t('settings_update_go2UpdatePage')}}</md-button>
	</div>
</template>
<style lang="sass" scoped>
.update-notify
	background: #260d73
	position: relative
	margin: 16px
	padding: 16px    
	border-radius: 16px
	background-size: 256px
	background-position: right
	background-repeat: no-repeat
	background-image: url('/img/update.svg')
	color: #FFF
	box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.3)
	.md-button
		margin-left: 0
</style>
<script>
export default {
	name: "poka-update",
	created() {
		this.axios.get(_setting(`server`) + "/status/").then(response => {
			this.fetchNewVersion(response.data.version);
		});
	},
	data: () => ({ checkUpadteStatus: null }),
	methods: {
		compareVersion(local, remote) {
			local = local.split(".").map(e => parseInt(e));
			remote = remote.split(".").map(e => parseInt(e));
			//版本號加權對比
			local = local[0] * 1000 * 1000 + local[1] * 1000 + local[2];
			remote = remote[0] * 1000 * 1000 + remote[1] * 1000 + remote[2];
			return remote > local;
		},
		fetchNewVersion(currentVersion) {
			fetch("https://api.github.com/repos/gnehs/PokaPlayer/releases")
				.then(e => e.json())
				.then(e => {
					if (this.compareVersion(currentVersion, e[0].tag_name)) {
						this.checkUpadteStatus = i18n.t(
							"settings_update_canUpdate2",
							{
								version: e[0].tag_name
							}
						);
					}
				})
				.catch(e => console.error(e));
		}
	}
};
</script>
