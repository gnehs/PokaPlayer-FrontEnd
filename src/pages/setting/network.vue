<template>
  <div>
    <div class="poka list">
      <div class="item" @click="showSoundQualityDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon>music_note</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">
              {{ $t('settings_network_soundQuality') }}
            </div>
            <div class="t-ellipsis">
              {{ $t(`settings_network_soundQuality_${soundQuality}`) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="showSoundQualityDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">{{ $t('settings_network_soundQuality') }}</v-card-title>

        <v-card-text>
          <poka-cards class="poka four doubling cards" :hide-overflow="false">
            <poka-card
              @click.native="setSoundQuality('Low')"
              poka-icon="music_note"
              :ellipsis="false"
              :poka-title="$t('settings_network_soundQuality_Low')"
              :poka-subtitle="$t('settings_network_soundQuality_Low_description')"
            />
            <poka-card
              @click.native="setSoundQuality('Med')"
              poka-icon="music_note"
              :ellipsis="false"
              :poka-title="$t('settings_network_soundQuality_Med')"
              :poka-subtitle="$t('settings_network_soundQuality_Med_description')"
            />
            <poka-card
              @click.native="setSoundQuality('High')"
              poka-icon="music_note"
              :ellipsis="false"
              :poka-title="$t('settings_network_soundQuality_High')"
              :poka-subtitle="$t('settings_network_soundQuality_High_description')"
            />
            <poka-card
              @click.native="setSoundQuality('Ori')"
              poka-icon="music_note"
              :ellipsis="false"
              :poka-title="$t('settings_network_soundQuality_Ori')"
              :poka-subtitle="$t('settings_network_soundQuality_Ori_description')"
            />
          </poka-cards>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showSoundQualityDialog = false">{{ $t('cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SettingNetwork',
  data: () => ({
    soundQuality: window._setting('audioQuality'),
    showSoundQualityDialog: false
  }),
  methods: {
    setSoundQuality(quality) {
      try {
        this.soundQuality = quality
        this.showSoundQualityDialog = false
        window._setting('audioQuality', quality)

        //同步設定
        this.axios({
          method: 'post',
          url: _setting(`server`) + '/pokaapi/v2/user/setting/',
          data: { n: { audioQuality: quality } }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
