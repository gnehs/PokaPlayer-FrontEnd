<template>
	<div class="login-container" :style="{backgroundImage:`url('${headerImg}')`}">
		<form class="md-layout" v-on:submit.prevent="login">
			<div class="md-layout-item">
				<md-card>
					<md-card-media-cover>
						<md-card-media md-ratio="16:9" class="card-banner">
							<img class="header-img" src="/img/loginHeader.svg" />
						</md-card-media>
					</md-card-media-cover>
				</md-card>
				<md-card>
					<md-card-content>
						<md-field>
							<label for="server">{{$t('login_page.server')}}</label>
							<md-input type="text" name="server" v-model.trim="server" :disabled="logining" />
						</md-field>
						<md-field>
							<label for="username">{{$t('login_page.username')}}</label>
							<md-input type="text" name="username" v-model="username" :disabled="logining" />
						</md-field>
						<md-field>
							<label for="password">{{$t('login_page.password')}}</label>
							<md-input type="password" name="password" v-model="password" :disabled="logining" />
						</md-field>
					</md-card-content>

					<md-progress-bar md-mode="indeterminate" v-if="logining" />

					<md-card-actions>
						<md-button
							type="submit"
							class="md-primary md-block md-outlined"
							:disabled="logining"
						>{{$t('login')}}</md-button>
					</md-card-actions>
				</md-card>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.md-progress-bar {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
	}
	.card-banner + .md-card-area {
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.6) 0%,
			transparent 100%
		);
	}
	form {
		height: 90%;
		justify-content: center;
		align-items: center;
		.md-card {
			margin: 0 auto;
			max-width: 400px;
			border-radius: 8px;
			overflow: hidden;
			box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(3px);
			background-color: rgba(255, 255, 255, 0.95);
			&.md-theme-default-dark {
				background-color: rgba(40, 37, 53, 0.975);
			}
			.md-card-media-cover {
				background: #505050;
			}
			.card-banner::before {
				padding-top: 170px !important;
			}
			.md-card-content {
				padding: 16px 32px;
				padding-bottom: 0;
			}
			.md-card-actions {
				padding: 16px 32px;
			}
			& + .md-card {
				margin-top: 8px;
			}
		}
	}
	// header-img
	.header-img {
		background: linear-gradient(-45deg, #d5ffb9, #de7fff);
	}
	@media (prefers-color-scheme: dark) {
		.header-img {
			background: linear-gradient(-45deg, #514f5d, #262334);
		}
	}

	.login-container {
		height: 100vh;
		width: 100vw;
		margin: -16px;
		background-size: cover;
		background-position: center;
	}
</style>
<script>
import { log } from "util";
export default {
	name: "Login",
	data: () => ({
		remember: false,
		logining: false,
		server: null,
		serverError: null,
		password: null,
		username: null,
		passwordError: null,
		headerImg: null,
		isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
	}),
	created() {
		this.remember = true;
		this.password = _setting(`password`);
		this.username = _setting(`username`);
		this.server = _setting(`server`);
		this.headerImg = _setting(`headerBgSource`);
	},
	methods: {
		login() {
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
					this.logining = false;
					if (response.success) {
						_setting(`password`, this.password);
						_setting(`username`, this.username);
						_setting(`server`, this.server);
						// 同步設定
						let settingReq = (await this.axios(
							this.server + "/setting/"
						)).data;
						for (let i of Object.keys(settingReq.settings)) {
							console.log(i);
							_setting(i, settingReq.settings[i]);
						}
						// 轉到首頁
						this.$router.push("/");
						//重新整理來啟用新設定值
						window.location.reload();
					} else {
						this.passwordError = "Wrong password";
						this.password = "";
						return false;
					}
				});
		}
	}
};
</script>
