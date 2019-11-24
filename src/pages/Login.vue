<template>
	<div class="login-container" :style="{backgroundImage:`url('${headerImg}')`}">
		<v-form ref="form" v-on:submit.prevent="login">
			<div class="form-container">
				<v-card class="mx-auto banner">
					<v-img class="banner-img" src="/img/loginHeader.svg" height="170px"></v-img>
				</v-card>
				<v-card class="mx-auto">
					<v-card-text>
						<v-text-field
							:label="$t('login_page.server')"
							outlined
							v-model.trim="server"
							:disabled="logining"
						></v-text-field>
						<v-text-field
							:label="$t('login_page.username')"
							outlined
							v-model="username"
							:disabled="logining"
						></v-text-field>
						<v-text-field
							:label="$t('login_page.password')"
							type="password"
							outlined
							v-model="password"
							:disabled="logining"
						></v-text-field>
						<v-btn block outlined type="submit" color="primary">{{$t('login')}}</v-btn>
					</v-card-text>
				</v-card>
			</div>
		</v-form>
	</div>
</template>

<style lang="scss" scoped>
	form {
		height: 90%;
		justify-content: center;
		align-items: center;
		display: flex;
		.form-container {
			flex: 1 1;
			max-width: 400px;
			.v-card {
				border-radius: 8px;
				background-color: rgba(255, 255, 255, 0.95);
				backdrop-filter: blur(3px);
				&.theme--dark {
					background-color: rgba(40, 37, 53, 0.975);
				}
				max-width: 400px;
				& + .v-card {
					margin-top: 8px;
					padding: 16px 32px;
				}
				&.banner {
					background-color: rgba(0, 0, 0, 0);
				}
			}
		}
	}
	// header-img
	.banner-img {
		background: linear-gradient(-45deg, #d5ffb9f0, #de7ffff0);
	}
	@media (prefers-color-scheme: dark) {
		.banner-img {
			background: linear-gradient(-45deg, #514f5df0, #262334f0);
		}
	}

	.login-container {
		height: 100vh;
		width: 100vw;
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
