<template>
  <div>
    <div class="poka list">
      <div class="item" @click="showSoundQualityDialog = true" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-music</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings.network.soundQuality.title') }}</div>
            <div
              class="t-ellipsis"
            >{{ $t(`settings.network.soundQuality.${soundQuality.toLocaleLowerCase()}.title`) }}</div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="showSoundQualityDialog" max-width="800">
      <v-card>
        <div class="dialog-title mb-2">{{ $t('settings.network.soundQuality.title') }}</div>
        <v-card-text>
          <poka-cards class="poka four doubling cards" :hide-overflow="false">
            <poka-card
              v-for="(item, index) of ['Low', 'Medium', 'High', 'Ori']"
              @click.native="setSoundQuality('Low')"
              :key="index"
              poka-icon="bx-music"
              :ellipsis="false"
              :poka-title="$t(`settings.network.soundQuality.${item.toLocaleLowerCase()}.title`)"
              :poka-subtitle="$t(`settings.network.soundQuality.${item.toLocaleLowerCase()}.description`)"
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
