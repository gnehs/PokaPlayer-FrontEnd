<template>
	<div>
		<poka-header :title="$t('settings')" />
		<poka-update />
		<poka-cards class="poka cards" :hide-overflow="false">
			<poka-card
				v-for="item in settingItems"
				:key="item.to"
				:to="item.to"
				:poka-icon="item.icon"
				:poka-title="item.text"
			/>
			<poka-card @click.native="aboutDialog=true" poka-icon="info" :poka-title="$t('settings_about')" />
		</poka-cards>
		<!-- 關於彈窗 -->
		<v-dialog v-model="aboutDialog" max-width="350">
			<poka-about />
		</v-dialog>
	</div>
</template>
<script>
export default {
	name: "Setting",
	data: () => ({
		aboutDialog: false,
		settingItems: [
			{ text: i18n.t('settings_network'), icon: 'cloud', to: "/settings/network" },
			{ text: i18n.t('settingInterface._'), icon: 'layers', to: "/settings/interface" },
			{ text: i18n.t('settingUser.title'), icon: 'person', to: "/settings/user" },
			{ text: i18n.t('settingPins.title'), icon: 'push_pin', to: "/settings/pins" },
			//{ text: i18n.t('settingPravicy.title'), icon: 'lock', to: "/settings/privacy" },
			{ text: i18n.t('settings_systemAndUpdate'), icon: 'system_update', to: "/settings/system" }
		],
	})
};
</script>