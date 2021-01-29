<template>
	<div>
		<poka-header :title="$t('settings')" subtitle="Customize your PokaPlayer experience." />
		<div class="setting-nav">
			<router-link
				class="setting-nav-item"
				:class="{active:$route.path==item.to}"
				v-for="item in items"
				:key="item.to"
				:to="item.to"
				v-ripple
			>
				<v-icon>{{item.icon}}</v-icon>
				<span>{{item.text}}</span>
			</router-link>
			<router-link
				class="setting-nav-item"
				:class="{active:$route.path==item.to}"
				v-for="item in adminItems"
				:key="item.to"
				:to="item.to"
				v-show="isAdmin"
				v-ripple
			>
				<v-icon>{{item.icon}}</v-icon>
				<span>{{item.text}}</span>
			</router-link>
		</div>
		<transition name="fade" mode="out-in" v-on:enter="pageEnter">
			<router-view :key="$route.path" />
		</transition>
	</div>
</template>
<script> 
export default {
	name: "App",
	data: () => ({

		isAdmin: false,
		settings: { darkMode: window._setting("darkMode") },
		items: [
			{ text: i18n.t('settings_network'), icon: 'wifi', to: "/settings/network" },
			{ text: i18n.t('settingInterface._'), icon: 'layers', to: "/settings/interface" },
			{ text: i18n.t('settingUser.title'), icon: 'person', to: "/settings/user" },
			{ text: i18n.t('settingPins.title'), icon: 'push_pin', to: "/settings/pins" },
		],
		adminItems: [
			{ text: i18n.t('settings_systemAndUpdate'), icon: 'system_update', to: "/settings/system" },
			{ text: i18n.t('settingUserManagement.title'), icon: 'person', to: "/settings/admin/users" },
		]
	}),
	created() {

		this.getStatus();

		this.isAdmin = JSON.parse(sessionStorage.getItem("login")).role == 'admin' || false

	},
	methods: {
		async getStatus() {
			// getStatus
			let response = await this.axios.get(_setting(`server`) + "/status/")
			// 沒登入滾回登入頁面
			if (!response.data.login) return this.$router.push("/login");
			// 標記為已登入
			let userProfile = await this.axios.get(_setting(`server`) + "/profile/");
			sessionStorage.setItem("login", JSON.stringify(userProfile.data));
			// sync settings
			let settings = JSON.parse(userProfile.data.settings)
			for (let i of Object.keys(settings)) {
				_setting(i, settings[i]);
			}
		},
	}
};
</script>
<style lang="sass" scoped>
.setting-nav
	position: relative
	display: flex
	flex-direction: row
	overflow-x: scroll
	margin-bottom: 16px
	.setting-nav-item
		display: flex
		flex-direction: row
		align-items: center
		padding: 6px 8px
		padding-right: 12px
		margin: 0 4px
		text-decoration: none
		transition: all .2s ease
		color: #000
		opacity: .8
		position: relative
		font-weight: bold
		border-radius: 100em
		.v-icon
			margin-right: 4px
		span
			white-space: pre
		&.active
			color: #FFF
			background: var(--v-primary-base)
			.v-icon
				color: #FFF

@media (prefers-color-scheme: dark)
	.setting-nav
		.setting-nav-item
			color: #FFF
</style>
