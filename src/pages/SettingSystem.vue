<template>
	<div>
		<poka-header :title="$t('settings')" :subtitle="$t('settings_systemAndUpdate')" />
		<v-list subheader>
			<v-list-item @click="$router.push('/setting')">
				<v-list-item-avatar>
					<v-icon>arrow_back</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('back')}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-subheader>{{$t('settings_system')}}</v-subheader>
			<v-list-item @click="restartConfirmActive=true">
				<v-list-item-avatar>
					<v-icon>autorenew</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('settings_restart')}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item @click="openUpdateDialog" :class="{mark: this.newVersion.tag}">
				<v-list-item-avatar>
					<v-icon>system_update</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('settings_update')}}</v-list-item-title>
					<v-list-item-subtitle>
						{{checkUpadteStatus}}
						<span v-if="poka_debug">(debug: {{poka_debug}})</span>
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-dialog v-model="restartConfirmActive" max-width="420">
			<v-card>
				<v-card-title class="headline">{{$t("settings_restartDialog_title")}}</v-card-title>
				<v-card-text style="padding-bottom: 0;">
					<p>{{$t('settings_updateDialog_note')}}</p>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="restartConfirmActive=false">{{$t('cancel')}}</v-btn>
					<v-btn text @click="restartConfirmActive=false;restart()" color="primary">{{$t('ok')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="showUpdateDialog" max-width="420">
			<v-card>
				<v-card-title
					class="headline"
				>{{$t("settings_updateDialog_title", { version: this.newVersion.tag})}}</v-card-title>
				<v-card-text style="padding-bottom: 0;">
					<p v-html="newVersion.body" />
					<p>{{$t('settings_updateDialog_note')}}</p>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="showUpdateDialog = false">{{$t('cancel')}}</v-btn>
					<v-btn
						text
						@click="showUpdateDialog = false;update()"
						color="primary"
					>{{$t('settings_update')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="showUpdateingDialog" persistent max-width="280">
			<v-card>
				<v-card-text style="padding: 0;">
					<pre class="log">{{updateLog}}</pre>
					<v-progress-linear indeterminate color="primary"></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="showRestartingDialog" persistent max-width="280">
			<v-card>
				<v-card-title class="headline">{{$t("settings_restarting")}}</v-card-title>
			</v-card>
		</v-dialog>

		<v-dialog v-model="showRestartCompletedDialog" persistent max-width="280">
			<v-card>
				<v-card-title class="headline">{{$t("settings_restart_completed")}}</v-card-title>
				<v-card-actions>
					<v-spacer />
					<v-btn text color="primary" @click="reload">{{$t('settings_update_reconnect')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: "SettingSystem",
	data: () => ({
		checkUpadteStatus: i18n.t("settings_update_checking4updates"),
		restartConfirmActive: false,
		showUpdateDialog: false,
		showUpdateingDialog: false,
		showRestartingDialog: false,
		showRestartCompletedDialog: false,
		updateLog: "",
		poka_version: null,
		poka_debug: null,
		newVersion: {
			prerelease: null,
			tag: null,
			body: "<h1>===PokaPlayer===</h1>"
		}
	}),
	created() {
		this.axios.get(_setting(`server`) + "/status/").then(response => {
			this.poka_version = response.data.version;
			this.poka_debug =
				response.data.debug != "false" ? response.data.debug : null;
			this.fetchNewVersion();
		});
	},
	methods: {
		openUpdateDialog() {
			if (this.poka_debug || this.newVersion.tag)
				this.showUpdateDialog = true;
		},
		fetchNewVersion() {
			fetch("https://api.github.com/repos/gnehs/PokaPlayer/releases")
				.then(e => e.json())
				.then(e => {
					this.newVersion.body = new showdown.Converter().makeHtml(
						e[0].body
					);
					if (this.compareVersion(this.poka_version, e[0].tag_name)) {
						this.newVersion.prerelease = e[0].prerelease;
						this.newVersion.tag = e[0].tag_name;

						this.checkUpadteStatus = i18n.t(
							"settings_update_update2",
							{
								version: this.newVersion.tag
							}
						);
					} else {
						this.checkUpadteStatus = i18n.t(
							"settings_update_latestVersion"
						);
					}
				})
				.catch(e => console.error(e));
		},
		update() {
			window._player.pause();
			this.axios.get("/upgrade").then(e => {
				this.showUpdateingDialog = true;
				this.updateLog +=
					window.i18n.t("settings_update_update2", {
						version: this.newVersion.tag
					}) + "\n";
				if (e.data == "upgrade") {
					setTimeout(() => {
						alert("更新完成！");
						location.reload();
					}, 30 * 1000);
				} else if (e.data == "socket") {
					_socket.emit("login", {
						username: window._setting(`username`),
						password: window._setting(`password`)
					});
					_socket.emit("update");

					window._socket.on("Permission Denied Desu", () => {
						this.showUpdateingDialog = false;
						alert("Permission Denied");
					});
					window._socket.on("init", () => {
						this.updateLog +=
							window.i18n.t("settings_update_initializing") +
							"\n";
					});
					window._socket.on("git", data => {
						this.updateLog +=
							{
								fetch: window.i18n.t(
									"settings_update_git_fetch"
								),
								reset: window.i18n.t(
									"settings_update_git_reset"
								),
								api: window.i18n.t("settings_update_git_api")
							}[data] + "\n";
					});
					window._socket.on("restart", () => {
						this.updateLog +=
							window.i18n.t("settings_restarting") + "\n";
					});
					window._socket.on("hello", () => {
						this.showUpdateingDialog = false;
						this.showRestartCompletedDialog = true;
					});
					window._socket.on("err", async data => {
						const delay = interval => {
							return new Promise(resolve => {
								setTimeout(resolve, interval);
							});
						};
						this.updateLog += `[ERROR] ${data}`;
						await delay(1000);
						this.showUpdateingDialog = false;
					});
				}
			});
		},
		restart() {
			window._player.pause();
			this.showRestartingDialog = true;
			this.axios.post("/restart");
			window._socket.on("hello", () => {
				this.showRestartingDialog = false;
				this.showRestartCompletedDialog = true;
			});
		},
		reload() {
			window.location.reload();
		},
		compareVersion(local, remote) {
			local = local.split(".").map(e => parseInt(e));
			remote = remote.split(".").map(e => parseInt(e));
			//版本號加權對比
			local = local[0] * 1000 * 1000 + local[1] * 1000 + local[2];
			remote = remote[0] * 1000 * 1000 + remote[1] * 1000 + remote[2];
			return remote > local;
		}
	}
};
</script><style lang="sass" scoped>
pre.log
	background: #000
	border-radius: 3px
	padding: 5px
	width: 280px
	height: 200px
	overflow: scroll
	font-family: 'Ubuntu Mono', monospace
	color: #FFF
</style>
