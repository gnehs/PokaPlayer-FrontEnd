<template>
	<div>
		<poka-header :title="$t('settingUser.title')" :subtitle="$t('settings')" />
		<md-list>
			<md-list-item to="/setting">
				<md-icon>arrow_back</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('back')}}</span>
				</div>
			</md-list-item>
		</md-list>
		<md-list class="md-double-line" style="padding-top:0" v-if="userdata">
			<md-list-item @click="temp.changeNamePrompt=true">
				<md-icon>person</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settingUser.name')}}</span>
					<span>{{userdata.name}}</span>
				</div>
			</md-list-item>
			<md-list-item @click="temp.changeUsernamePrompt=true">
				<md-icon>alternate_email</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settingUser.username')}}</span>
					<span>{{userdata.username}}</span>
				</div>
			</md-list-item>
			<md-list-item>
				<md-icon>settings</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settingUser.role')}}</span>
					<span>{{userdata.role}}</span>
				</div>
			</md-list-item>
			<md-list-item @click="temp.changePasswordDialog=true">
				<md-icon>lock</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settingUser.password')}}</span>
					<span>{{$t('settingUser.passwordDescription')}}</span>
				</div>
			</md-list-item>
		</md-list>
		<poka-loader v-else />
		<md-list>
			<md-list-item @click="logout">
				<md-icon>exit_to_app</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_logout')}}</span>
				</div>
			</md-list-item>
		</md-list>
		<md-dialog-prompt
			:md-active.sync="temp.changeNamePrompt"
			v-model="temp.changeNameValue"
			:md-title="$t('settingUser.changeName.title')"
			md-input-maxlength="30"
			:md-input-placeholder="$t('settingUser.changeName.placeholder')"
			:md-cancel-text="$t('cancel')"
			@md-confirm="changeName"
			:md-confirm-text="$t('done')"
		/>
		<md-dialog-prompt
			:md-active.sync="temp.changeUsernamePrompt"
			v-model="temp.changeUsernameValue"
			:md-title="$t('settingUser.changeUsername.title')"
			md-input-maxlength="30"
			:md-input-placeholder="$t('settingUser.changeUsername.placeholder')"
			:md-cancel-text="$t('cancel')"
			@md-confirm="changeUsername"
			:md-confirm-text="$t('done')"
		/>
		<md-dialog
			:md-active.sync="temp.changePasswordDialog"
			:md-click-outside-to-close="false"
			:md-fullscreen="false"
		>
			<md-dialog-title>{{$t('settingUser.changePassword.title')}}</md-dialog-title>
			<md-dialog-content>
				<md-field>
					<label>{{$t('settingUser.changePassword.oldPassword')}}</label>
					<md-input type="password" v-model="temp.changePasswordold"></md-input>
				</md-field>
				<md-field>
					<label>{{$t('settingUser.changePassword.newPassword')}}</label>
					<md-input type="password" v-model="temp.changePassword"></md-input>
				</md-field>
				<md-field>
					<label>{{$t('settingUser.changePassword.confirmPassword')}}</label>
					<md-input type="password" v-model="temp.changePassword2"></md-input>
					<span class="md-helper-text">{{$t('settingUser.changePassword.confirmPasswordHelperText')}}</span>
				</md-field>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary" @click="temp.changePasswordDialog = false">{{$t('cancel')}}</md-button>
				<md-button class="md-primary" @click="changePassword">{{$t('settingUser.changePassword.done')}}</md-button>
			</md-dialog-actions>
		</md-dialog>
		<md-snackbar
			md-position="center"
			:md-duration="3000"
			:md-active.sync="snackbar.show"
			md-persistent
		>
			<span>{{snackbar.text}}</span>
		</md-snackbar>
	</div>
</template>
        
<script>
export default {
	name: "SettingUser",
	data: () => ({
		userdata: null,
		snackbar: { show: false, text: "" },
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
		this.axios.get(_setting(`server`) + "/profile/").then(response => {
			this.userdata = response.data;
		});
	},
	methods: {
		changeName() {
			if (this.temp.changeNameValue == "" || !this.temp.changeNameValue)
				return this.showMessage(
					window.i18n.t("settingUser.changeName.result.error")
				);
			this.axios
				.post(_setting(`server`) + "/changeName/", {
					n: this.temp.changeNameValue
				})
				.then(response => {
					if (response.data.success) {
						this.userdata.name = this.temp.changeNameValue;
						this.showMessage(
							window.i18n.t(
								"settingUser.changeName.result.success",
								{
									name: this.temp.changeNameValue
								}
							)
						);
					} else {
						this.showMessage(
							window.i18n.t("settingUser.changeName.result.error")
						);
					}
				});
		},
		changeUsername() {
			if (
				this.temp.changeUsernameValue == "" ||
				!this.temp.changeUsernameValue
			)
				return this.showMessage(
					window.i18n.t("settingUser.changeUsername.result.error")
				);
			this.axios
				.post(_setting(`server`) + "/changeUsername/", {
					n: this.temp.changeUsernameValue
				})
				.then(response => {
					if (response.data.success) {
						this.userdata.username = this.temp.changeUsernameValue;
						this.showMessage(
							window.i18n.t(
								"settingUser.changeUsername.result.success",
								{
									name: this.temp.changeUsernameValue
								}
							)
						);
					} else if (response.data.error) {
						this.showMessage(response.data.error);
					} else {
						this.showMessage(
							window.i18n.t(
								"settingUser.changeUsername.result.error"
							)
						);
					}
				});
		},
		changePassword() {
			if (
				this.temp.changePassword == "" ||
				!this.temp.changePassword ||
				this.temp.changePassword2 == "" ||
				!this.temp.changePassword2 ||
				this.temp.changePasswordold == "" ||
				!this.temp.changePasswordold
			)
				return this.showMessage(
					window.i18n.t("settingUser.changePassword.result.error")
				);
			if (this.temp.changePassword !== this.temp.changePassword2)
				return this.showMessage(
					window.i18n.t(
						"settingUser.changePassword.result.inconsistent"
					)
				);
			if (this.temp.changePassword !== this.temp.changePasswordold)
				return this.showMessage(
					window.i18n.t("settingUser.changePassword.result.same")
				);
			this.axios
				.post(_setting(`server`) + "/changePassword/", {
					oldpassword: this.temp.changePasswordold,
					password: this.temp.changePassword
				})
				.then(response => {
					if (response.data.success) {
						this.showMessage(
							window.i18n.t(
								"settingUser.changePassword.result.success"
							)
						);
						this.temp.changePasswordDialog = false;
					} else if (response.data.error) {
						this.showMessage(response.data.error);
					} else {
						this.showMessage(
							window.i18n.t(
								"settingUser.changePassword.result.error"
							)
						);
					}
				});
		},
		showMessage(text) {
			this.snackbar.text = text;
			this.snackbar.show = true;
		},
		logout() {
			sessionStorage.removeItem("login");
			this.axios("/logout").then(e => this.$router.push("/login"));
		}
	}
};
</script>
        

<style lang="sass" scoped>
.md-list
	padding-bottom: 0
</style>

        