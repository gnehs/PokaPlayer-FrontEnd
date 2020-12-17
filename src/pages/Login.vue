<template>
	<div class="login-container">
		<poka-header />
		<div class="login-row">
			<div class="login-intro">
				<div class="intro-container">
					<h1 class="welcome">PokaPlayer</h1>
					<div class="features">
						<div class="feature">
							<v-icon large color="green darken-2">mdi-code-braces</v-icon>
							<div class="title">{{$t('login_page.features.opensource.title')}}</div>
							<div class="description">{{$t('login_page.features.opensource.description')}}</div>
						</div>
						<div class="feature">
							<v-icon large color="blue darken-2">mdi-puzzle</v-icon>
							<div class="title">{{$t('login_page.features.module.title')}}</div>
							<div class="description">{{$t('login_page.features.module.description')}}</div>
						</div>
						<div class="feature">
							<v-icon large color="purple darken-2">mdi-music-note</v-icon>
							<div class="title">{{$t('login_page.features.streaming.title')}}</div>
							<div class="description">{{$t('login_page.features.streaming.description')}}</div>
						</div>
						<div class="feature">
							<v-icon large color="teal darken-2">mdi-clock-fast</v-icon>
							<div class="title">{{$t('login_page.features.fastinstall.title')}}</div>
							<div class="description">{{$t('login_page.features.fastinstall.description')}}</div>
						</div>
					</div>
					<br />
					<div class="title">{{$t('login_page.tips.firstLogin.title')}}</div>
					<p>{{$t('login_page.tips.firstLogin.description')}}</p>
					<br />
					<p>
						<v-btn icon href="https://github.com/gnehs/PokaPlayer" target="_blank">
							<v-icon>mdi-github</v-icon>
						</v-btn>
						<v-btn icon href="https://github.com/gnehs/PokaPlayer/graphs/contributors" target="_blank">
							<v-icon>mdi-account-group</v-icon>
						</v-btn>
						<v-btn icon href="https://github.com/gnehs/PokaPlayer/issues" target="_blank">
							<v-icon>mdi-alert-circle-outline</v-icon>
						</v-btn>
					</p>
					<div style="max-width: 200px;margin: 0 auto">
						<v-select v-model="currentLang" @change="setLang" solo :items="langs" />
					</div>
				</div>
			</div>
			<div class="login-form">
				<div class="box">
					<v-card class="mx-auto" max-width="400">
						<v-toolbar dark color="primary">
							<v-toolbar-title>{{$t('login')}}</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-menu offset-y close-on-content-click>
								<template v-slot:activator="{ on }">
									<v-btn icon v-on="on">
										<v-icon>mdi-dots-vertical</v-icon>
									</v-btn>
								</template>
								<v-list>
									<v-list-item @click="clearSessionDialog=true">
										<v-list-item-title>{{$t('login_page.session._')}}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</v-toolbar>
						<v-divider></v-divider>

						<v-card-text>
							<v-overlay absolute :value="logining">
								<poka-loader />
							</v-overlay>
							<div>
								<v-text-field
									outlined
									:label="$t('login_page.server')"
									v-model.trim="server"
									:disabled="logining"
								></v-text-field>
								<v-text-field
									outlined
									:label="$t('login_page.username')"
									v-model="username"
									:disabled="logining"
								></v-text-field>
								<v-text-field
									outlined
									:label="$t('login_page.password')"
									type="password"
									v-model="password"
									:disabled="logining"
								></v-text-field>
							</div>
							<v-btn block :disabled="logining" color="primary" @click="login">{{$t('login')}}</v-btn>
						</v-card-text>
					</v-card>
				</div>
			</div>
		</div>
		<v-dialog v-model="clearSessionDialog" max-width="420">
			<v-card>
				<v-card-title class="headline">{{$t('login_page.session._')}}</v-card-title>

				<v-card-text>
					<p>{{$t('login_page.session.description')}}</p>
					<p>{{$t('login_page.session.description2')}}</p>
					<v-text-field
						outlined
						:label="$t('login_page.server')"
						v-model.trim="server"
						:disabled="logining"
					></v-text-field>
					<v-text-field
						outlined
						:label="$t('login_page.username')"
						v-model="username"
						:disabled="logining"
					></v-text-field>
					<v-text-field
						outlined
						:label="$t('login_page.password')"
						type="password"
						v-model="password"
						:disabled="logining"
					></v-text-field>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn text @click="clearSessionDialog = false">{{$t('cancel')}}</v-btn>

					<v-btn color="red" text @click="clearSession">{{$t('reset')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<style lang="scss" scoped>
	.login-container {
		position: relative;
		height: 100vh;
		width: 100vw;
	}
	.login-row {
		display: flex;
		height: 100vh;
		max-width: 1200px;
		margin: 0 auto;
		.login-intro {
			min-width: 500px;
			height: 100vh;
			padding: 10px;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			overflow: scroll;
			.intro-container {
				max-width: 500px;
				margin: 0 auto;
				border-radius: 8px;
				text-align: center;
				h1.welcome {
					font-weight: normal;
					font-size: 48px;
					margin: 20px 0;
					font-family: var(--product-font);
				}
				.features {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					.feature {
						width: 50%;
						padding: 8px 4px;
					}
				}
			}
		}
		.login-form {
			position: relative;
			flex: 1;
			height: 100vh;
			overflow: hidden;
			.box {
				margin: auto;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 400px;
				height: fit-content;
			}
		}
	}
	@media (max-width: 1200px) {
		.login-row {
			display: block;
			.login-intro {
				display: none;
			}
			.login-form {
				position: relative;
				width: 100vw;
			}
		}
	}
	@media (prefers-color-scheme: dark) {
		form {
			background-color: rgba(0, 0, 0, 0.7);
		}
	}
</style>
<script>
export default {
	name: "Login",
	data: () => ({
		remember: false,
		logining: false,
		clearSessionDialog: false,
		server: null,
		serverError: null,
		password: null,
		username: null,
		passwordError: null,
		headerImg: null,
		isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
		currentLang: i18n.locale,
		langs: Object.keys(i18n.messages).map(x => ({ text: i18n.t("title", x), value: x })),
	}),
	created() {
		this.remember = true;
		this.password = _setting(`password`);
		this.username = _setting(`username`);
		this.server = _setting(`server`);
		this.headerImg = _setting(`headerBgSource`);
	},
	methods: {
		setLang() {
			window.i18n.locale = this.currentLang;
			window._setting("lang", this.currentLang);
		},
		async login() {
			this.passwordError = null;
			this.serverError = null;
			this.server = this.server.replace(/\/$/, ""); // remove last "/"
			if (!this.password || !this.server) {
				if (!this.password) {
					this.passwordError = "Wrong password";
				}
				if (!this.server) {
					this.serverError = "Unable to connect to server";
				}
				return;
			}
			this.logining = true;
			await this.axios.get(this.server + "/logout/")
			this.axios({
				method: "post",
				url: this.server + "/login/",
				data: { password: this.password, username: this.username },
				config: { headers: { "Content-Type": "multipart/form-data" } }
			})
				.catch(
					error => (this.serverError = "Unable to connect to server")
				)
				.then(res => res.data)
				.then(async response => {
					if (response.success) {
						_setting(`password`, this.password);
						_setting(`username`, this.username);
						_setting(`server`, this.server);
						// 同步設定
						let settingReq = (await this.axios(
							this.server + "/setting/"
						)).data;
						for (let i of Object.keys(settingReq.settings)) {
							_setting(i, settingReq.settings[i]);
						}
						//login socket
						_socket.emit("login", {
							username: window._setting(`username`),
							password: window._setting(`password`)
						});
						_socket.emit('send-nickname', _setting('nickname'));
						// 轉到首頁
						this.$router.push("/");
						//重新整理來啟用新設定值
						window.location.reload();
					} else {
						this.logining = false;
						this.passwordError = "Wrong password";
						this.password = "";
						return false;
					}
				});
		},
		async clearSession() {
			this.clearSessionDialog = false;
			let clrres = await this.axios({
				method: "post",
				url: this.server + "/clear-session/",
				data: { password: this.password, username: this.username },
				config: { headers: { "Content-Type": "multipart/form-data" } }
			})
			if (clrres.data.success) {
				this.$snackbar(i18n.t("login_page.session.success"))
			} else {
				this.$snackbar(i18n.t("login_page.session.fail") + clrres.data.e)
			}
		}
	}
};
</script>
