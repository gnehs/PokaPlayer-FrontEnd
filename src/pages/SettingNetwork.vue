<template>
	<div>
		<poka-header :title="$t('settings')" :subtitle="$t('settings_network')" />
		<md-list style="padding-bottom:0">
			<md-list-item to="/setting">
				<v-icon>arrow_back</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('back')}}</span>
				</div>
			</md-list-item>
		</md-list>
		<md-list class="md-double-line" style="padding-top:0">
			<md-list-item @click="showSoundQualityDialog=true">
				<v-icon>music_note</v-icon>
				<div class="md-list-item-text">
					<span>{{$t('settings_network_soundQuality')}}</span>
					<span>{{$t(`settings_network_soundQuality_${soundQuality}`)}}</span>
				</div>
			</md-list-item>
		</md-list>
		<md-dialog :md-active.sync="showSoundQualityDialog" :md-fullscreen="false">
			<md-dialog-title>{{$t('settings_network_soundQuality')}}</md-dialog-title>
			<poka-cards class="poka four doubling cards" :hide-overflow="false">
				<poka-card
					@click.native="setSoundQuality('Low')"
					poka-icon="outline-music_note"
					:poka-title="$t('settings_network_soundQuality_Low')"
					:poka-subtitle="$t('settings_network_soundQuality_Low_description')"
				/>
				<poka-card
					@click.native="setSoundQuality('Med')"
					poka-icon="outline-music_note"
					:poka-title="$t('settings_network_soundQuality_Med')"
					:poka-subtitle="$t('settings_network_soundQuality_Med_description')"
				/>
				<poka-card
					@click.native="setSoundQuality('High')"
					poka-icon="outline-music_note"
					:poka-title="$t('settings_network_soundQuality_High')"
					:poka-subtitle="$t('settings_network_soundQuality_High_description')"
				/>
				<poka-card
					@click.native="setSoundQuality('Ori')"
					poka-icon="outline-music_note"
					:poka-title="$t('settings_network_soundQuality_Ori')"
					:poka-subtitle="$t('settings_network_soundQuality_Ori_description')"
				/>
			</poka-cards>
			<md-dialog-actions>
				<md-button class="md-primary" @click="showSoundQualityDialog = false">{{$t('cancel')}}</md-button>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>

<script>
export default {
	name: "SettingNetwork",
	data: () => ({
		soundQuality: window._setting("audioQuality"),
		showSoundQualityDialog: false
	}),
	methods: {
		setSoundQuality(quality) {
			try {
				this.soundQuality = quality;
				this.showSoundQualityDialog = false;
				window._setting("audioQuality", quality);

				//同步設定
				this.axios({
					method: "post",
					url: _setting(`server`) + "/setting/",
					data: { n: { audioQuality: quality } }
				});
			} catch (e) {
				console.error(e);
			}
		}
	}
};
</script>