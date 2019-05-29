<template>
	<div>
		<form class="md-layout" v-on:submit.prevent="login">
			<md-card class="md-layout-item md-size-50 md-small-size-100">
				<md-card-media-cover>
					<md-card-media md-ratio="16:9" class="card-banner">
						<img src="https://source.unsplash.com/random">
					</md-card-media>

					<md-card-area>
						<md-card-header>
							<span class="md-title">Login</span>
						</md-card-header>
					</md-card-area>
				</md-card-media-cover>

				<md-card-content>
					<md-field>
						<md-icon class="md-accent" v-if="serverError">warning</md-icon>
						<md-icon class="md-accent" v-else>link</md-icon>
						<label for="server">Server</label>
						<md-input type="text" name="server" v-model.trim="server" :disabled="logining"/>
					</md-field>
					<md-field>
						<md-icon class="md-accent" v-if="passwordError">warning</md-icon>
						<md-icon class="md-accent" v-else>vpn_key</md-icon>
						<label for="password">Password</label>
						<md-input type="password" name="password" v-model="password" :disabled="logining"/>
					</md-field>
				</md-card-content>

				<md-progress-bar md-mode="indeterminate" v-if="logining"/>

				<md-card-actions>
					<md-button type="submit" class="md-raised md-primary" :disabled="logining">{{$t('login')}}</md-button>
				</md-card-actions>
			</md-card>
		</form>
	</div>
</template>

<script>
export default {
	name: "Login",
	data: () => ({
		remember: false,
		logining: false,
		server: null,
		serverError: null,
		password: null,
		passwordError: null
	}),
	created() {
		this.remember = true;
		this.password = _setting(`password`);
		this.server = _setting(`server`);
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
			let formData = new URLSearchParams();
			formData.append("userPASS", this.password);

			this.axios({
				method: "post",
				url: this.server + "/login/",
				data: formData,
				config: { headers: { "Content-Type": "multipart/form-data" } }
			})
				.catch(
					error => (this.serverError = "Unable to connect to server")
				)
				.then(res => res.data)
				.then(response => {
					this.logining = false;
					if (response == "success") {
						_setting(`rememberPass`, this.remember);
						_setting(
							`password`,
							this.remember ? this.password : null
						);
						_setting(`server`, this.server);
						this.$router.push("/");
					}
					if (response == "fail") {
						this.passwordError = "Wrong password";
						this.password = "";
						return false;
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
	.md-progress-bar {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
	}
	form .md-card {
		margin: 0 auto;
	}
</style>