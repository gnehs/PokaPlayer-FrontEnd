<template>
	<div v-if="!installed">
		<poka-header title="安裝嚮導" subtitle="PokaPlayer"/>
		<md-steppers
			:md-active-step.sync="active"
			md-vertical
			:md-linear="true"
			:md-dynamic-height="true"
			v-show="!step.server_restarting&&!step.server_restarted"
		>
			<md-step
				id="step_description"
				:md-label="$t('install.description.title')"
				:md-done.sync="step.description"
			>
				<h1>{{$t('install.description.title')}}</h1>
				<p v-html="$t('install.description.text')"/>
				<h1 v-html="$t('install.note.title')"/>
				<p v-html="$t('install.note.text')"></p>
				<ul>
					<li v-html="$t('install.note.docker')"/>
					<li v-html="$t('install.note.netease.title')"/>
					<ul v-html="$t('install.note.netease.text')"/>
					<li v-html="$t('install.note.dsm.title')"/>
					<ul v-html="$t('install.note.dsm.text')"/>
				</ul>
				<md-button
					class="md-raised md-primary"
					@click="setDone('description', 'pokaplayer')"
					v-html="$t('install.next')"
				/>
			</md-step>

			<md-step
				id="step_pokaplayer"
				md-label="PokaPlayer"
				:md-error="step.pokaplayer_err"
				:md-done.sync="step.pokaplayer"
			>
				<md-field>
					<label for="login-password" v-html="$t('install.poka.login_password')"/>
					<md-input name="login-password" id="login-password" v-model="setting.PokaPlayer.password"/>
				</md-field>
				<md-field>
					<label for="admin-password" v-html="$t('install.poka.admin_password')"/>
					<md-input
						name="admin-password"
						id="admin-password"
						v-model="setting.PokaPlayer.adminPassword"
					/>
				</md-field>
				<p v-html="$t('install.poka.note')"/>
				<md-button
					class="md-raised md-primary"
					@click="setDone('pokaplayer', 'module')"
					v-html="$t('install.next')"
				/>
			</md-step>

			<md-step
				id="step_module"
				:md-label="$t('install.module')"
				:md-error="step.module_err"
				:md-done.sync="step.module"
			>
				<md-card>
					<md-card-content>
						<h2 v-html="$t('install.enabled')"/>
						<md-divider/>
						<md-switch v-model="setting.DSM.enabled">{{$t('install.dsm.dsm')}}</md-switch>

						<div v-if="setting.DSM.enabled">
							<h2 v-html="$t('install.dsm.connect_to_dsm')"/>
							<md-divider/>
							<div class="md-layout md-gutter">
								<div class="md-layout-item">
									<md-field>
										<label for="DSM-protocol" v-html="$t('install.protocol')"/>
										<md-select v-model="setting.DSM.protocol" name="DSM-protocol" id="DSM-protocol">
											<md-option value="http">http://</md-option>
											<md-option value="https">https://</md-option>
										</md-select>
									</md-field>
								</div>
								<div class="md-layout-item">
									<md-field>
										<label v-html="$t('install.host')"/>
										<md-input v-model="setting.DSM.host"/>
									</md-field>
								</div>
								<div class="md-layout-item">
									<md-field>
										<label v-html="$t('install.port')"/>
										<md-input v-model="setting.DSM.port" type="number"/>
									</md-field>
								</div>
							</div>

							<h2 v-html="$t('login')"/>
							<md-divider/>
							<div class="md-layout md-gutter">
								<div class="md-layout-item">
									<md-field>
										<label v-html="$t('install.account')"/>
										<md-input v-model="setting.DSM.account"/>
									</md-field>
								</div>
								<div class="md-layout-item">
									<md-field>
										<label v-html="$t('install.password')"/>
										<md-input v-model="setting.DSM.password"/>
									</md-field>
								</div>
							</div>
						</div>
					</md-card-content>
				</md-card>
				<br>
				<md-card>
					<md-card-content>
						<h2 v-html="$t('install.enabled')"/>
						<md-divider/>
						<md-switch v-model="setting.Netease2.enabled">{{$t('install.netease.netease')}}</md-switch>
						<div v-if="setting.Netease2.enabled">
							<h2 v-html="$t('install.netease.connect_to_netease')"/>
							<md-divider/>
							<div class="md-layout md-gutter">
								<div class="md-layout-item">
									<md-field>
										<label for="netease-protocol" v-html="$t('install.protocol')"/>
										<md-select v-model="netease.protocol" name="netease-protocol">
											<md-option value="http://">http://</md-option>
											<md-option value="https://">https://</md-option>
										</md-select>
									</md-field>
								</div>
								<div class="md-layout-item">
									<md-field>
										<label v-html="$t('install.host')"/>
										<md-input v-model="netease.host"/>
									</md-field>
								</div>
								<div class="md-layout-item">
									<md-field>
										<label v-html="$t('install.port')"/>
										<md-input v-model="netease.port" type="number"/>
									</md-field>
								</div>
							</div>
							<h2 v-html="$t('install.account')"/>
							<div class="md-layout md-gutter">
								<div class="md-layout-item">
									<md-field>
										<label for="neteaseloginby" v-html="$t('install.netease.loginby.title')"/>
										<md-select v-model="netease.loginby" name="neteaseloginby">
											<md-option value="email">{{$t('install.netease.loginby.email')}}</md-option>
											<md-option value="phone">{{$t('install.netease.loginby.phone')}}</md-option>
										</md-select>
									</md-field>
								</div>
								<div class="md-layout-item">
									<md-field v-if="netease.loginby=='email'">
										<label v-html="$t('install.netease.loginby.email')"/>
										<md-input v-model="setting.Netease2.login.email"/>
									</md-field>
									<md-field v-else>
										<label v-html="$t('install.netease.loginby.phone')"/>
										<md-input v-model="setting.Netease2.login.phone"/>
									</md-field>
								</div>
								<div class="md-layout-item">
									<md-field>
										<label v-html="$t('install.password')"/>
										<md-input v-model="setting.Netease2.login.password"/>
									</md-field>
								</div>
							</div>
							<md-divider/>
							<h2 v-html="$t('install.netease.subscription.title')"/>
							<md-divider/>
							<md-switch
								v-model="setting.Netease2.topPlaylist.enabled"
							>{{$t('install.netease.subscription.topPlaylist')}}</md-switch>
							<md-switch
								v-model="setting.Netease2.dailyRecommendSongs.enabled"
							>{{$t('install.netease.subscription.dailyRecommendSongs')}}</md-switch>
							<md-switch
								v-model="setting.Netease2.dailyRecommendPlaylists.enabled"
							>{{$t('install.netease.subscription.dailyRecommendPlaylists')}}</md-switch>
							<md-switch
								v-model="setting.Netease2.hqPlaylist.enabled"
							>{{$t('install.netease.subscription.hqPlaylist')}}</md-switch>
						</div>
					</md-card-content>
				</md-card>
				<br>
				<md-button
					class="md-raised md-primary"
					@click="setDone('module', 'done')"
					v-html="$t('install.done')"
				/>
			</md-step>

			<md-step id="step_done" :md-label="$t('install.finish.title')" :md-done.sync="step.done">
				<p v-html="$t('install.finish.text')"/>
				<md-button
					class="md-raised md-primary"
					@click="setDone('done');checkRestart()"
					v-html="$t('install.done')"
				/>
				<md-button
					class="md-primary"
					@click="downloadSetting"
					v-html="$t('install.finish.download_config')"
				/>
			</md-step>
		</md-steppers>
		<md-empty-state
			md-icon="done"
			:md-label="$t('install.state.done_title')"
			:md-description="step.server_restarting_description"
			v-if="step.server_restarting"
		>
			<md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
		</md-empty-state>
		<md-empty-state
			md-icon="done"
			:md-label="$t('install.state.done_title')"
			:md-description="$t('install.state.done_server_restarted')"
			v-if="step.server_restarted"
		>
			<md-button class="md-primary md-raised" to="/" v-html="$t('install.done')"/>
		</md-empty-state>
	</div>
	<md-empty-state
		md-icon="done"
		:md-label="$t('install.state.poka_title')"
		:md-description="$t('install.state.poka_description')"
		v-else
	>
		<md-button class="md-primary md-raised" to="/" v-html="$t('home')"/>
	</md-empty-state>
</template>

<script>
export default {
	name: "Install",
	data: () => ({
		active: "step_description",
		installed: false,
		step: {
			description: false,
			pokaplayer: false,
			pokaplayer_err: null,
			module: false,
			module_err: null,
			done: false,
			server_restarting: false,
			server_restarting_description: "",
			server_restarted: false
		},
		netease: {
			protocol: "",
			host: "netease",
			port: 443,
			loginby: "email"
		},
		setting: {
			PokaPlayer: {
				adminPassword: null,
				password: null,
				passwordSwitch: true,
				sessionSecret: Math.random()
					.toString(36)
					.substring(7),
				instantUpgradeProcess: true,
				debug: false
			},
			DSM: {
				enabled: true,
				protocol: null,
				host: "localhost",
				port: 5000,
				account: null,
				password: null
			},
			Netease2: {
				enabled: true,
				server: null,
				isPremium: true,
				topPlaylist: {
					enabled: true,
					category: "ACG",
					limit: 5,
					order: "hot",
					image: "/img/topPlaylist.png"
				},
				dailyRecommendSongs: {
					enabled: true,
					image: "/img/dailyRecommendSongs.png"
				},
				dailyRecommendPlaylists: {
					enabled: true,
					image: "/img/dailyRecommendPlaylists.png"
				},
				hqPlaylist: {
					enabled: true,
					category: "ACG",
					limit: 20,
					image: "/img/hqPlaylist.png"
				},
				login: {
					email: null,
					phone: null,
					password: null
				}
			}
		}
	}),
	created() {
		this.axios.get(_setting(`server`) + "/status/").then(response => {
			this.installed = response.data.install;
			this.installed = false;
		});
		this.server_restarting_description = this.$t(
			"install.state.done_commit"
		);
	},
	methods: {
		setDone(id, index) {
			this.step.pokaplayer_err = null;
			if (id == "pokaplayer") {
				if (
					!this.setting.PokaPlayer.password ||
					!this.setting.PokaPlayer.adminPassword
				) {
					this.step.pokaplayer_err = this.$t(
						"install.poka.please_enter_password"
					);
					return alert(this.$t("install.poka.please_enter_password"));
				} else {
					this.step.pokaplayer_err = null;
					this.step[id] = true;
				}
			} else if (id == "module") {
				this.step.module_err = null;
				this.setting.Netease2.server =
					this.netease.protocol +
					this.netease.host +
					":" +
					this.netease.port +
					"/";
				return this.checkConnection();
			} else {
				this.step[id] = true;
			}
			if (index) {
				this.active = "step_" + index;
			}
		},
		async checkConnection() {
			let test_dsm, test_netease;
			try {
				test_dsm = this.setting.DSM.enabled
					? (await this.axios.post(
							"/installapi/dsm",
							this.setting.DSM
					  )).data
					: true;
				test_netease = this.setting.Netease2.enabled
					? (await this.axios.post(
							"/installapi/netease2",
							this.setting.Netease2
					  )).data
					: true;
				if (
					test_dsm &&
					test_dsm != "error" &&
					test_netease &&
					test_netease != "error"
				) {
					this.step.module = true;
					this.active = "step_done";
				} else {
					let _Error = [];
					test_dsm == "error" || !test_dsm
						? _Error.push(this.$t("install.dsm.error"))
						: null;
					test_netease == "error" || !test_netease
						? _Error.push(this.$t("install.netease.error"))
						: null;
					this.step.module_err = _Error.join(", ");
					alert(_Error.join(", "));
				}
			} catch (e) {
				this.step.module_err = e;
				console.error("e", e);
			}
		},
		async checkRestart() {
			this.step.server_restarting = true;
			let configPost = (await this.axios.post(
				"/installapi/config",
				this.setting
			)).data;
			if (configPost == "done")
				this.step.server_restarting_description = this.$t(
					"install.state.done_restarting"
				);
			window._socket.on("hello", () => {
				this.step.server_restarting = false;
				this.step.server_restarted = true;
			});
		},
		downloadSetting() {
			let data = new Blob([JSON.stringify(this.setting, null, "\t")], {
				type: "application/json"
			});
			let url = URL.createObjectURL(data);
			let link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "config.json");
			document.body.appendChild(link);
			link.click();
		}
	}
};
</script>