<template>
	<div>
		<v-app-bar :clipped-left="$vuetify.breakpoint.mdAndUp" app dark color="primary">
			<v-btn icon to="/home">
				<v-icon class="material-icons-outlined">mdi-close</v-icon>
			</v-btn>
			<v-app-bar-nav-icon @click.stop="toggleMenu()" v-if="!$vuetify.breakpoint.mdAndUp" />
			<v-toolbar-title style="width: 300px">
				<span>{{$t('settings')}}</span>
			</v-toolbar-title>
			<v-spacer />
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.mdAndUp"
			:mini-variant="$vuetify.breakpoint.mdOnly"
			:mobile-breakpoint="960"
			app
		>
			<v-list nav dense>
				<v-list-item-group color="primary">
					<template v-for="item in items">
						<v-divider v-if="item.divider" :key="item.text" style="margin: 4px 0;" />
						<v-list-item v-else :key="item.text" :to="item.to" link>
							<v-list-item-action>
								<v-icon class="material-icons-outlined" v-text="item.icon"></v-icon>
								<v-icon class="material-icons" v-text="item.icon"></v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>{{ item.text }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<transition name="fade" mode="out-in" v-on:enter="pageEnter">
			<v-main :key="$route.path">
				<div class="router-view">
					<router-view />
				</div>
			</v-main>
		</transition>
	</div>
</template>
<script>
import Vue from "vue";
export default {
	name: "App",
	data: () => ({
		menuVisible: false,
		drawer: null,
		scrollPositions: {},
		settings: { darkMode: window._setting("darkMode") },
		items: [
			{ text: i18n.t("settings"), icon: 'settings', to: "/setting" },
			{ divider: true },
			{ text: i18n.t('settings_network'), icon: 'wifi', to: "/settings/network" },
			{ text: i18n.t('settingInterface._'), icon: 'layers', to: "/settings/interface" },
			{ text: i18n.t('settingUser.title'), icon: 'person', to: "/settings/user" },
			{ text: i18n.t('settingPins.title'), icon: 'push_pin', to: "/settings/pins" },
			{ text: i18n.t('settingPravicy.title'), icon: 'lock', to: "/settings/privacy" },
		],
	}),
	created() {
		// 調整狀態欄
		document.getElementsByTagName('meta')["theme-color"].content = window._setting('theme')

		this.drawer = this.$vuetify.breakpoint.mdAndUp
		this.getStatus();

		let isAdmin = JSON.parse(sessionStorage.getItem("login")).role == 'admin' || false
		if (isAdmin) {
			this.items.push(
				{ divider: true },
				{ text: i18n.t('settings_systemAndUpdate'), icon: 'system_update', to: "/settings/system" },
				{ text: i18n.t('settingUserManagement.title'), icon: 'person', to: "/settings/admin/users" },
			)
		}
	},
	methods: {
		closeMenu() {
			this.drawer = false;
		},
		toggleMenu() {
			this.drawer = !this.drawer;
		},
		switch_audio_order() {
			_player.options.order = _player.options.order === "random" ? "list" : "random";
			this.audio_order = _player.options.order;
		},
		switchTheme() {
			this.settings.darkMode = !this.settings.darkMode;
			window._setting("darkMode", this.settings.darkMode);
			this.settings.darkMode ? window._theme.switchToDark() : window._theme.switchToLight();
		},
		getStatus() {
			this.axios
				.get(_setting(`server`) + "/status/")
				.then(async response => {
					if (!response.data.login) {
						return this.$router.push("/login");
					}
					// 標記為已登入
					let userProfile = await this.axios.get(_setting(`server`) + "/profile/");
					sessionStorage.setItem("login", JSON.stringify(userProfile.data));
				});
		},
		pageEnter() {
			let currentRouteName = this.$router.history.current.name;
			let el = document.querySelector("main");
			if (el && currentRouteName in this.scrollPositions) {
				let positions = this.scrollPositions[currentRouteName];
				setTimeout(() => (el.scrollTop = positions), 100);
			}
		},

	}
};
</script>
<style lang="sass" scoped>
nav
	.v-list-item
		.material-icons:not(.material-icons-outlined)
			display: none
		&.v-item--active
			.material-icons:not(.material-icons-outlined)
				display: block
			.material-icons-outlined
				display: none
main
	height: calc(var(--vh,1vh) * 100)
	overflow: hidden
	overflow-y: scroll
	margin-bottom: 0
nav
	.v-list
		.v-list-item.theme--dark
			&.v-list-item--active::before
				opacity: 1
				background-color: var(--v-primary-base) !important
			.v-list-item__action,.v-list-item__content
				z-index: 1
@media (min-width: 576px)
	.router-view
		padding: 16px
</style>
