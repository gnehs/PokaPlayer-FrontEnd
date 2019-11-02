<template>
	<div>
		<poka-header :title="$t('settings')" />
		<poka-update />
		<md-list class="md-double-line">
			<md-list-item to="/setting/network">
				<md-icon>cloud</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_network')}}</span>
					<span>{{$t('settings_network_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/customize">
				<md-icon>format_paint</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_customize')}}</span>
					<span>{{$t('settings_customize_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/lang">
				<md-icon>translate</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_lang')}}</span>
					<span>{{$t('settings_lang_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/user">
				<md-icon>person</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settingUser.title')}}</span>
					<span>{{$t('settingUser.description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/system">
				<md-icon>system_update</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_systemAndUpdate')}}</span>
					<span>{{$t('settings_systemAndUpdate_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item @click="aboutDialog=true">
				<md-icon>info</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_about')}}</span>
					<span>{{$t('settings_about_description')}}</span>
				</div>
			</md-list-item>
		</md-list>
		<md-dialog :md-active.sync="aboutDialog" :md-fullscreen="false">
			<md-dialog-title>{{$t('settings_about')}}</md-dialog-title>
			<poka-about />
			<md-dialog-actions>
				<md-button class="md-primary" @click="aboutDialog=false">{{$t('back')}}</md-button>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>
<script>
export default {
	name: "Setting",
	data: () => ({
		settings: { darkMode: window._setting("darkMode") },
		aboutDialog: false
	})
};
</script>