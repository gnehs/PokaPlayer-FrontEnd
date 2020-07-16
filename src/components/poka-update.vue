<template>
	<transition name="fade-slide-up">
		<poka-card
			v-if="card&&checkUpadteStatus"
			poka-bg="/img/update.svg"
			:ellipsis="false"
			to="/settings/system?update=true"
			:poka-title="$t('settings_update')"
			:poka-subtitle="checkUpadteStatus"
			style="--card-background-color: #2f2b3eB3"
		/>
		<div class="update-notify" key="0" v-else-if="checkUpadteStatus">
			<h1>{{$t('settings_update')}}</h1>
			<p>{{checkUpadteStatus}}</p>

			<v-btn
				outlined
				to="/settings/system?update=true"
				color="white"
				dark
			>{{$t('settings_update_go2UpdatePage')}}</v-btn>
		</div>
	</transition>
</template>
<style lang="sass" scoped>
.update-notify
	background: #2f2b3e
	text-shadow: 0 0 6px #2f2b3e
	position: relative
	margin: 16px 2px
	padding: 24px 32px
	border-radius: 8px
	background-size: 240px
	background-position: right
	background-repeat: no-repeat
	background-image: url('/img/update.svg')
	color: #FFF
	box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.3)
</style>
<script>
export default {
	name: "poka-update",
	props: {
		card: { default: false },
	},
	created() {
		this.axios
			.get(_setting(`server`) + "/status/")
			.then(res => res.data)
			.then(data => {
				this.fetchNewVersion(data.version);
				if (data.debug) this.debug = data.debug;
			});
	},
	data: () => ({ checkUpadteStatus: null, debug: null }),
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
					if (
						this.compareVersion(currentVersion, e[0].tag_name) ||
						this.debug
					) {
						this.checkUpadteStatus = i18n.t(
							"settings_update_canUpdate2",
							{
								version: e[0].tag_name
							}
						);
						if (this.debug)
							this.checkUpadteStatus += ` (debug: ${this.debug})`;
					}
				})
				.catch(e => console.error(e));
		}
	}
};
</script>
