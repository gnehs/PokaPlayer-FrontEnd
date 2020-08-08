<template>
	<div>
		<poka-header :title="$t('settingUser.title')" />
		<div class="poka list">
			<div class="item" @click="temp.changeNamePrompt=true" v-if="userdata" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>person</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingUser.name')}}</div>
						<div class="t-ellipsis">{{userdata.name}}</div>
					</div>
				</div>
			</div>
			<div class="item" @click="temp.changeUsernamePrompt=true" v-if="userdata" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>alternate_email</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingUser.username')}}</div>
						<div class="t-ellipsis">{{userdata.username}}</div>
					</div>
				</div>
			</div>
			<div class="item" v-if="userdata">
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>settings</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingUser.role')}}</div>
						<div class="t-ellipsis">{{userdata.role}}</div>
					</div>
				</div>
			</div>
			<div class="item" @click="temp.changePasswordDialog=true" v-if="userdata">
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>lock</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingUser.password')}}</div>
						<div class="t-ellipsis">{{$t('settingUser.passwordDescription')}}</div>
					</div>
				</div>
			</div>
			<div class="item" @click="temp.changePasswordDialog=true" v-if="userdata">
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>exit_to_app</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settings_logout')}}</div>
					</div>
				</div>
			</div>
		</div>
		<poka-loader v-if="!userdata" />

		<v-dialog v-model="temp.changeNamePrompt" max-width="300">
			<v-card>
				<v-card-title class="headline">{{$t("settingUser.changeName.title")}}</v-card-title>
				<v-card-text style="padding-bottom: 0;">
					<v-text-field
						:label="$t('settingUser.changeName.placeholder')"
						v-model.trim="temp.changeNameValue"
						filled
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="temp.changeNamePrompt=false">{{$t('cancel')}}</v-btn>
					<v-btn text @click="temp.changeNamePrompt=false;changeName()" color="primary">{{$t('done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="temp.changeUsernamePrompt" max-width="300">
			<v-card>
				<v-card-title class="headline">{{$t("settingUser.changeName.title")}}</v-card-title>
				<v-card-text style="padding-bottom: 0;">
					<v-text-field
						:label="$t('settingUser.changeUsername.placeholder')"
						v-model.trim="temp.changeUsernameValue"
						filled
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="temp.changeUsernamePrompt=false">{{$t('cancel')}}</v-btn>
					<v-btn
						text
						@click="temp.changeUsernamePrompt=false;changeUsername()"
						color="primary"
					>{{$t('done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="temp.changePasswordDialog" max-width="300">
			<v-card>
				<v-card-title class="headline">{{$t("settingUser.changePassword.title")}}</v-card-title>
				<v-card-text>
					<v-text-field
						:label="$t('settingUser.changePassword.oldPassword')"
						v-model="temp.changePasswordold"
						outlined
					></v-text-field>
					<v-text-field
						:label="$t('settingUser.changePassword.newPassword')"
						v-model="temp.changePassword"
						outlined
					></v-text-field>
					<v-text-field
						:label="$t('settingUser.changePassword.confirmPassword')"
						v-model="temp.changePassword2"
						:hint="$t('settingUser.changePassword.confirmPasswordHelperText')"
						outlined
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="temp.changePasswordDialog=false">{{$t('cancel')}}</v-btn>
					<v-btn text @click="changePassword()" color="primary">{{$t('settingUser.changePassword.done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
        
<script>
export default {
	name: "SettingUser",
	data: () => ({
		userdata: null,
		temp: {
			changeNamePrompt: false,
			changeNameValue: "",
			changeUsernamePrompt: false,
			changeUsernameValue: "",
			changePasswordDialog: false,
			changePassword: "",
			changePassword2: "",
			changePasswordold: ""
		}
	}),
	created() {
		this.axios.get(_setting(`server`) + "/profile/").then(response => { this.userdata = response.data; });
	},
	methods: {
		changeName() {
			if (this.temp.changeNameValue == "" || !this.temp.changeNameValue)
				return this.$snackbar(window.i18n.t("settingUser.changeName.result.error"));
			this.axios
				.post(_setting(`server`) + "/changeName/", { n: this.temp.changeNameValue })
				.then(response => {
					if (response.data.success) {
						this.userdata.name = this.temp.changeNameValue;
						this.$snackbar(window.i18n.t("settingUser.changeName.result.success", { name: this.temp.changeNameValue }));
					} else {
						this.$snackbar(window.i18n.t("settingUser.changeName.result.error"));
					}
				});
		},
		changeUsername() {
			if (this.temp.changeUsernameValue == "" || !this.temp.changeUsernameValue)
				return this.$snackbar(window.i18n.t("settingUser.changeUsername.result.error"));
			this.axios
				.post(_setting(`server`) + "/changeUsername/", { n: this.temp.changeUsernameValue })
				.then(response => {
					if (response.data.success) {
						this.userdata.username = this.temp.changeUsernameValue;
						this.$snackbar(window.i18n.t("settingUser.changeUsername.result.success", { name: this.temp.changeUsernameValue }));
					} else if (response.data.error) {
						this.$snackbar(response.data.error);
					} else {
						this.$snackbar(window.i18n.t("settingUser.changeUsername.result.error"));
					}
				});
		},
		changePassword() {
			if (
				this.temp.changePassword == "" || !this.temp.changePassword ||
				this.temp.changePassword2 == "" || !this.temp.changePassword2 ||
				this.temp.changePasswordold == "" || !this.temp.changePasswordold
			)
				return this.$snackbar(window.i18n.t("settingUser.changePassword.result.error"));
			if (this.temp.changePassword !== this.temp.changePassword2)
				return this.$snackbar(window.i18n.t("settingUser.changePassword.result.inconsistent"));
			if (this.temp.changePassword === this.temp.changePasswordold)
				return this.$snackbar(window.i18n.t("settingUser.changePassword.result.same"));
			this.axios
				.post(_setting(`server`) + "/changePassword/", {
					oldpassword: this.temp.changePasswordold,
					password: this.temp.changePassword
				})
				.then(response => {
					if (response.data.success) {
						this.$snackbar(window.i18n.t("settingUser.changePassword.result.success"));
						this.temp.changePasswordDialog = false;
					} else if (response.data.error) {
						this.$snackbar(response.data.error);
					} else {
						this.$snackbar(window.i18n.t("settingUser.changePassword.result.error"));
					}
				});
		},
		logout() {
			sessionStorage.removeItem("login");
			this.axios(_setting(`server`) + "/logout").then(e => this.$router.push("/login"));
		}
	}
};
</script>
