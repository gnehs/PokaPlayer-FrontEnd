<template>
	<form class="md-layout" v-on:submit.prevent="login">
		<md-card class="md-layout-item">
			<md-card-media-cover>
				<md-card-media md-ratio="16:9" class="card-banner">
					<img class="header-img" src="https://source.unsplash.com/daily" />
				</md-card-media>

				<md-card-area>
					<md-card-header>
						<span class="md-title">PokaPlayer</span>
					</md-card-header>
				</md-card-area>
			</md-card-media-cover>

			<md-card-content>
				<md-field>
					<md-icon class="md-accent" v-if="serverError">warning</md-icon>
					<md-icon class="md-accent" v-else>link</md-icon>
					<label for="server">Server</label>
					<md-input type="text" name="server" v-model.trim="server" :disabled="logining" />
				</md-field>
				<md-field>
					<md-icon class="md-accent">vpn_key</md-icon>
					<label for="username">Username</label>
					<md-input type="text" name="username" v-model="username" :disabled="logining" />
				</md-field>
				<md-field>
					<md-icon class="md-accent" v-if="passwordError">warning</md-icon>
					<md-icon class="md-accent" v-else>vpn_key</md-icon>
					<label for="password">Password</label>
					<md-input type="password" name="password" v-model="password" :disabled="logining" />
				</md-field>
			</md-card-content>

			<md-progress-bar md-mode="indeterminate" v-if="logining" />

			<md-card-actions>
				<md-button type="submit" class="md-raised md-primary" :disabled="logining">{{$t('login')}}</md-button>
			</md-card-actions>
		</md-card>
	</form>
</template>

<style lang="scss" scoped>
	.md-card-media-cover {
		background: #505050;
	}
	.card-banner::before {
		padding-top: 170px !important;
	}
	.md-progress-bar {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
	}
	.header-img {
		transform: translateY(-50%) scale(1.2);
		filter: blur(3px) brightness(70%);
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
			.md-button {
				background: linear-gradient(
					120deg,
					#4251fb 0%,
					#0401a3 100%
				) !important;
			}
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
		passwordError: null
	}),
	created() {
		this.remember = true;
		this.password = _setting(`password`);
		this.username = _setting(`username`);
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
				.then(response => {
					this.logining = false;
					if (response.success) {
						_setting(`password`, this.password);
						_setting(`username`, this.username);
						_setting(`server`, this.server);
						this.$router.push("/");
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
