<template>
	<div class="login-container" :style="{'--login-bg':`url('${headerImg}')`}">
		<div class="license-container">
			<a href="https://loading.io/">banner background from loading.io</a>
		</div>
		<v-form ref="form" v-on:submit.prevent="login">
			<div class="form-container">
				<p style="margin-bottom:4px;font-family:var(--product-font);font-size:3.75rem;">PokaPlayer</p>
				<v-expand-transition>
					<div class="text-center" style="margin: 50px 0;" v-show="logining">
						<v-progress-circular indeterminate color="primary"></v-progress-circular>
					</div>
				</v-expand-transition>
				<v-expand-transition>
					<div v-show="!logining">
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
				</v-expand-transition>
				<v-btn block type="submit" :disabled="logining" color="primary">{{$t('login')}}</v-btn>
			</div>
		</v-form>
	</div>
</template>

<style lang="scss" scoped>
	form {
		height: 100%;
		justify-content: center;
		align-items: center;
		display: flex;
		max-width: calc(350px + 30px + 30px);
		padding: 0 30px;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
		.form-container {
			flex: 1 1;
			max-width: 350px;
		}
		animation: slideout 0.6s ease 0.3s;
		animation-fill-mode: forwards;
		transform: translate(-100%);
	}
	@media (max-width: 575.98px) {
		form {
			width: 100%;
			max-width: 100%;
			padding: 0;
			background-color: rgba(255, 255, 255, 0.95);
		}
	}
	@keyframes slideout {
		from {
			transform: translate(-100%);
		}
		to {
			transform: translate(0);
		}
	}
	@media (prefers-color-scheme: dark) {
		form {
			background-color: rgba(0, 0, 0, 0.7);
		}
	}

	.login-container {
		height: 100vh;
		width: 100vw;
		background-size: cover;
		background-position: center;
		background-image: var(--login-bg);
	}
	@media (prefers-color-scheme: dark) {
		.login-container {
			background-image: linear-gradient(
					rgba(0, 0, 0, 0.6),
					rgba(0, 0, 0, 0.6)
				),
				var(--login-bg);
		}
	}

	.license-container {
		position: absolute;
		bottom: 3px;
		right: 3px;
		opacity: 0.1;
		a {
			color: #fff;
		}
	}
</style>
<script>
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
						//login socket
						_socket.emit("login", {
							username: window._setting(`username`),
							password: window._setting(`password`)
						});
						socket.emit('send-nickname', _setting('nickname'));
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
		}
	}
};
</script>
