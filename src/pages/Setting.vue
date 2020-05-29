<template>
	<div>
		<poka-header :title="$t('settings')" />
		<poka-update />
		<div class="poka list">
			<div
				class="item"
				v-for="item in settingItems"
				:key="item.title"
				@click="$router.push(item.to)"
				v-ripple
			>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>{{item.icon}}</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{item.title}}</div>
						<div class="t-ellipsis">{{item.desp}}</div>
					</div>
				</div>
			</div>
			<div class="item" @click="aboutDialog=true" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>info</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settings_about')}}</div>
						<div class="t-ellipsis">{{$t('settings_about_description')}}</div>
					</div>
				</div>
			</div>
		</div>
		<v-dialog v-model="aboutDialog" max-width="350">
			<poka-about />
		</v-dialog>
	</div>
</template>
<script>
export default {
	name: "Setting",
	data: () => ({
		settings: { darkMode: window._setting("darkMode") },
		aboutDialog: false,
		settingItems: [{
			title: i18n.t('settings_network'),
			desp: i18n.t('settings_network_description'),
			icon: 'cloud', to: "/setting/network"
		}, {
			title: i18n.t('settings_customize'),
			desp: i18n.t('settings_customize_description'),
			icon: 'format_paint', to: "/setting/customize"
		}, {
			title: i18n.t('settings_lang'),
			desp: i18n.t('settings_lang_description'),
			icon: 'translate', to: "/setting/lang"
		}, {
			title: i18n.t('settingUser.title'),
			desp: i18n.t('settingUser.description'),
			icon: 'person', to: "/setting/user"
		}, {
			title: i18n.t('settingPravicy.title'),
			desp: i18n.t('settingPravicy.description'),
			icon: 'lock', to: "/setting/privacy"
		}, {
			title: i18n.t('settings_systemAndUpdate'),
			desp: i18n.t('settings_systemAndUpdate_description'),
			icon: 'system_update', to: "/setting/system"
		}]
	})
};
</script>