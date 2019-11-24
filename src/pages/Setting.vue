<template>
	<div>
		<poka-header :title="$t('settings')" />
		<poka-update />
		<md-list class="md-double-line">
			<md-list-item to="/setting/network">
				<v-icon>cloud</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_network')}}</span>
					<span>{{$t('settings_network_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/customize">
				<v-icon>format_paint</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_customize')}}</span>
					<span>{{$t('settings_customize_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/lang">
				<v-icon>translate</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_lang')}}</span>
					<span>{{$t('settings_lang_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/user">
				<v-icon>person</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('settingUser.title')}}</span>
					<span>{{$t('settingUser.description')}}</span>
				</div>
			</md-list-item>
			<md-list-item to="/setting/system">
				<v-icon>system_update</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_systemAndUpdate')}}</span>
					<span>{{$t('settings_systemAndUpdate_description')}}</span>
				</div>
			</md-list-item>
			<md-list-item @click="aboutDialog=true">
				<v-icon>info</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_about')}}</span>
					<span>{{$t('settings_about_description')}}</span>
				</div>
			</md-list-item>
		</md-list>
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
		aboutDialog: false
	})
};
</script>