<template>
	<div>
		<poka-header :title="$t('settingUser.title')" />
		<v-list subheader>
			<v-list-item @click="temp.changeNamePrompt=true" v-if="userdata">
				<v-list-item-avatar>
					<v-icon>person</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('settingUser.name')}}</v-list-item-title>
					<v-list-item-subtitle>{{userdata.name}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-list-item @click="temp.changeUsernamePrompt=true" v-if="userdata">
				<v-list-item-avatar>
					<v-icon>alternate_email</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('settingUser.username')}}</v-list-item-title>
					<v-list-item-subtitle>{{userdata.username}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-list-item v-if="userdata">
				<v-list-item-avatar>
					<v-icon>settings</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('settingUser.role')}}</v-list-item-title>
					<v-list-item-subtitle>{{userdata.role}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-list-item @click="temp.changePasswordDialog=true" v-if="userdata">
				<v-list-item-avatar>
					<v-icon>lock</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('settingUser.password')}}</v-list-item-title>
					<v-list-item-subtitle>{{$t('settingUser.passwordDescription')}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-list-item @click="logout">
				<v-list-item-avatar>
					<v-icon>exit_to_app</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{$t('settings_logout')}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
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
		<v-snackbar v-model="snackbar.show">{{snackbar.text}}</v-snackbar>
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
		this.axios.get(_setting(`server`) + "/profile/").then(response => { this.userdata = response.data; });
	},
	methods: {
		changeName() {
			if (this.temp.changeNameValue == "" || !this.temp.changeNameValue)
				return this.showMessage(window.i18n.t("settingUser.changeName.result.error"));
			this.axios
				.post(_setting(`server`) + "/changeName/", { n: this.temp.changeNameValue })
				.then(response => {
					if (response.data.success) {
						this.userdata.name = this.temp.changeNameValue;
						this.showMessage(window.i18n.t("settingUser.changeName.result.success", { name: this.temp.changeNameValue }));
					} else {
						this.showMessage(window.i18n.t("settingUser.changeName.result.error"));
					}
				});
		},
		changeUsername() {
			if (this.temp.changeUsernameValue == "" || !this.temp.changeUsernameValue)
				return this.showMessage(window.i18n.t("settingUser.changeUsername.result.error"));
			this.axios
				.post(_setting(`server`) + "/changeUsername/", { n: this.temp.changeUsernameValue })
				.then(response => {
					if (response.data.success) {
						this.userdata.username = this.temp.changeUsernameValue;
						this.showMessage(window.i18n.t("settingUser.changeUsername.result.success", { name: this.temp.changeUsernameValue }));
					} else if (response.data.error) {
						this.showMessage(response.data.error);
					} else {
						this.showMessage(window.i18n.t("settingUser.changeUsername.result.error"));
					}
				});
		},
		changePassword() {
			if (
				this.temp.changePassword == "" || !this.temp.changePassword ||
				this.temp.changePassword2 == "" || !this.temp.changePassword2 ||
				this.temp.changePasswordold == "" || !this.temp.changePasswordold
			)
				return this.showMessage(window.i18n.t("settingUser.changePassword.result.error"));
			if (this.temp.changePassword !== this.temp.changePassword2)
				return this.showMessage(window.i18n.t("settingUser.changePassword.result.inconsistent"));
			if (this.temp.changePassword === this.temp.changePasswordold)
				return this.showMessage(window.i18n.t("settingUser.changePassword.result.same"));
			this.axios
				.post(_setting(`server`) + "/changePassword/", {
					oldpassword: this.temp.changePasswordold,
					password: this.temp.changePassword
				})
				.then(response => {
					if (response.data.success) {
						this.showMessage(window.i18n.t("settingUser.changePassword.result.success"));
						this.temp.changePasswordDialog = false;
					} else if (response.data.error) {
						this.showMessage(response.data.error);
					} else {
						this.showMessage(window.i18n.t("settingUser.changePassword.result.error"));
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
