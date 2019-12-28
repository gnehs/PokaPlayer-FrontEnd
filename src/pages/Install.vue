<template>
	<div v-if="!installed" style="overflow-y: scroll;padding: 16px;">
		<poka-header />
		<div class="hw-header mx-auto" style="max-width: 1024px;">
			<div class="hw-title">PokaPlayer</div>
			<div class="hw-subtitle">{{$t('install.title')}}</div>
		</div>
		<v-stepper
			v-model="active"
			class="mx-auto"
			style="max-width: 1024px;"
			vertical
			v-show="!step.server_restarting&&!step.server_restarted"
		>
			<v-stepper-step
				:complete="active!='step_description'"
				step="0"
			>{{$t('install.description.title')}}</v-stepper-step>
			<v-stepper-content step="step_description">
				<h1>{{$t('install.description.title')}}</h1>
				<p v-html="$t('install.description.text')" />
				<h1 v-html="$t('install.note.title')" />
				<p v-html="$t('install.note.text')"></p>
				<ul>
					<li v-html="$t('install.note.docker')" />
					<li v-html="$t('install.note.mongo')" />
					<li v-html="$t('install.note.netease.title')" />
					<ul v-html="$t('install.note.netease.text')" />
					<li v-html="$t('install.note.dsm.title')" />
					<ul v-html="$t('install.note.dsm.text')" />
				</ul>
				<v-btn color="primary" @click="setDone('description', 'pokaplayer')">{{$t('install.next')}}</v-btn>
			</v-stepper-content>

			<v-stepper-step step="1">PokaPlayer</v-stepper-step>
			<v-stepper-content step="step_pokaplayer">
				<v-text-field label="MongoDB" v-model="setting.mongodb" filled></v-text-field>
				<p v-html="$t('install.poka.note')" />
				<v-btn color="primary" @click="setDone('pokaplayer', 'module')">{{$t('install.next')}}</v-btn>
			</v-stepper-content>

			<v-stepper-step step="2">{{$t('install.module')}}</v-stepper-step>
			<v-stepper-content step="step_module">
				<v-card outlined style="background-color: #292535 !important;">
					<v-card-text>
						<h2 v-html="$t('install.dsm.dsm')" />
						<v-divider style="margin: 4px 0" />
						<v-switch v-model="setting.DSM.enabled" :label="$t('install.enabled')"></v-switch>
						<div v-if="setting.DSM.enabled">
							<h2 v-html="$t('install.dsm.connect_to_dsm')" />
							<v-divider style="margin: 4px 0" />
							<v-row align="center">
								<v-col class="d-flex" cols="12" md="4">
									<v-select
										:items="['http://','https://']"
										:label="$t('install.protocol')"
										v-model="setting.DSM.protocol"
										outlined
									></v-select>
								</v-col>
								<v-col class="d-flex" cols="12" md="4">
									<v-text-field :label="$t('install.host')" v-model="setting.DSM.host" outlined></v-text-field>
								</v-col>
								<v-col class="d-flex" cols="12" md="4">
									<v-text-field
										:label="$t('install.port')"
										v-model="setting.DSM.port"
										type="number"
										outlined
									></v-text-field>
								</v-col>
							</v-row>

							<h2 v-html="$t('login')" />
							<v-divider style="margin: 4px 0" />
							<v-row align="center">
								<v-col class="d-flex" cols="12" md="6">
									<v-text-field :label="$t('install.account')" v-model="setting.DSM.account" outlined></v-text-field>
								</v-col>
								<v-col class="d-flex" cols="12" md="6">
									<v-text-field :label="$t('install.password')" v-model="setting.DSM.password" outlined></v-text-field>
								</v-col>
							</v-row>
						</div>
					</v-card-text>
				</v-card>
				<br />
				<v-card outlined style="margin-top:16px;background-color: #292535 !important;">
					<v-card-text>
						<h2 v-html="$t('install.neteaseLyric')" />
						<v-divider style="margin: 4px 0" />
						<v-switch v-model="setting.neteaseLyric.enabled" :label="$t('install.enabled')"></v-switch>
					</v-card-text>
				</v-card>
				<br />

				<v-card outlined style="margin-top:16px;background-color: #292535 !important;">
					<v-card-text>
						<h2 v-html="$t('install.netease.netease')" />
						<v-divider style="margin: 4px 0" />
						<v-switch v-model="setting.Netease2.enabled" :label="$t('install.enabled')"></v-switch>
						<div v-if="setting.Netease2.enabled">
							<h2 v-html="$t('install.netease.connect_to_netease')" />
							<v-divider style="margin: 4px 0" />

							<v-row align="center">
								<v-col class="d-flex" cols="12" md="4">
									<v-select
										:items="['http://','https://']"
										:label="$t('install.protocol')"
										v-model="netease.protocol"
										outlined
									></v-select>
								</v-col>
								<v-col class="d-flex" cols="12" md="4">
									<v-text-field :label="$t('install.host')" v-model="netease.host" outlined></v-text-field>
								</v-col>
								<v-col class="d-flex" cols="12" md="4">
									<v-text-field :label="$t('install.port')" v-model="netease.port" type="number" outlined></v-text-field>
								</v-col>
							</v-row>
							<h2 v-html="$t('install.account')" />
							<v-divider style="margin: 4px 0" />
							<v-row align="center">
								<v-col class="d-flex" cols="12" md="4">
									<v-select
										:items="['email','phone']"
										:label="$t('install.netease.loginby.title')"
										v-model="netease.loginby"
										outlined
									></v-select>
								</v-col>
								<v-col class="d-flex" cols="12" md="4">
									<v-text-field
										:label="$t('install.netease.loginby.email')"
										v-model="setting.Netease2.login.email"
										outlined
										v-if="netease.loginby=='email'"
									></v-text-field>
									<v-text-field
										:label="$t('install.netease.loginby.phone')"
										v-model="setting.Netease2.login.phone"
										outlined
										v-else
									></v-text-field>
								</v-col>
								<v-col class="d-flex" cols="12" md="4">
									<v-text-field
										:label="$t('install.password')"
										v-model="setting.Netease2.login.password"
										outlined
									></v-text-field>
								</v-col>
							</v-row>
							<h2 v-html="$t('install.netease.subscription.title')" />
							<v-divider style="margin: 4px 0" />
							<v-switch
								v-model="setting.Netease2.topPlaylist.enabled"
								:label="$t('install.netease.subscription.topPlaylist')"
							/>
							<v-switch
								v-model="setting.Netease2.dailyRecommendSongs.enabled"
								:label="$t('install.netease.subscription.dailyRecommendSongs')"
							/>
							<v-switch
								v-model="setting.Netease2.dailyRecommendPlaylists.enabled"
								:label="$t('install.netease.subscription.dailyRecommendPlaylists')"
							/>
							<v-switch
								v-model="setting.Netease2.hqPlaylist.enabled"
								:label="$t('install.netease.subscription.hqPlaylist')"
							/>
						</div>
					</v-card-text>
				</v-card>
				<br />
				<v-btn color="primary" @click="setDone('module', 'done')">{{$t('install.next')}}</v-btn>
			</v-stepper-content>

			<v-stepper-step step="3">{{$t('install.finish.title')}}</v-stepper-step>
			<v-stepper-content step="step_done">
				<p v-html="$t('install.finish.text')" />
				<v-btn color="primary" @click="setDone('done');checkRestart()" v-html="$t('install.done')" />
				<v-btn color="primary" @click="downloadSetting" v-html="$t('install.finish.download_config')" />
			</v-stepper-content>
		</v-stepper>

		<v-card
			v-if="step.server_restarting"
			class="mx-auto"
			max-width="344"
			style="margin-top:32px;"
			key="card"
		>
			<v-card-text class="text-center">
				<v-icon class="material-icons-outlined display-4 " >done</v-icon>
				<p class="headline text--primary">{{$t('install.state.done_title')}}</p>
				<poka-loader />
			</v-card-text>
		</v-card>
		<v-card
			v-if="step.server_restarted"
			class="mx-auto"
			max-width="344"
			style="margin-top:32px;"
			key="card"
		>
			<v-card-text class="text-center">
				<v-icon class="material-icons-outlined display-4 " >done</v-icon>
				<p class="headline text--primary">{{$t('install.state.done_title')}}</p>
				<p>{{$t('install.state.done_server_restarted')}}</p>

				<v-btn to="/" v-html="$t('install.done')" />
			</v-card-text>
		</v-card>
	</div>

	<v-card v-else class="mx-auto" max-width="344" style="margin-top:32px;" key="card">
		<v-card-text class="text-center">
				<v-icon class="material-icons-outlined display-4 " >done</v-icon>
			<p class="headline text--primary">{{$t('install.state.poka_title')}}</p>
			<p>{{$t('install.state.poka_description')}}</p>

			<v-btn to="/" v-html="$t('home')" />
		</v-card-text>
	</v-card>
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
			mongodb: "mongodb://mongodb/poka",
			DSM: {
				enabled: true,
				protocol: null,
				host: "localhost",
				port: 5000,
				account: null,
				password: null
			},
			neteaseLyric: {
				enabled: true
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
			if (response.data.debug) this.installed = false;
		});
		this.server_restarting_description = this.$t(
			"install.state.done_commit"
		);
	},
	methods: {
		setDone(id, index) {
			this.step.pokaplayer_err = null;
			if (id == "pokaplayer") {
				if (!this.setting.mongodb) {
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