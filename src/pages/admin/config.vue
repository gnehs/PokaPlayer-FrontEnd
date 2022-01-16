<template>
  <div>
    <poka-loader v-if="!Object.entries(configs).length" />
    <div v-if="Object.entries(configs).length" class="mx-auto" style="max-width: 1024px">
      <config-cards>
        <config-card
          v-model="configs.PokaPlayer.debug"
          :title="$t('settings.config.pokaplayer.debug.title')"
          :description="$t('settings.config.pokaplayer.debug.description')"
          bg-color="#f00"
          icon="bx-code-alt"
        />
        <config-card
          v-model="configs.PokaPlayer.sc2tc"
          :title="$t('settings.config.pokaplayer.sc2tc.title')"
          :description="$t('settings.config.pokaplayer.sc2tc.description')"
          bg-color="#45a600"
          icon="bx-message-detail"
        />
        <config-card
          v-model="configs.PokaPlayer.fixPunctuation"
          :title="$t('settings.config.pokaplayer.fixPunctuation.title')"
          :description="$t('settings.config.pokaplayer.fixPunctuation.description')"
          bg-color="#45a600"
          icon="bx-message-edit"
        />
        <config-card
          v-model="configs.QQMusic.enabled"
          :title="$t('settings.config.QQMusic.title')"
          :description="$t('settings.config.QQMusic.description')"
          bg-color="#00f"
          icon="bx-customize"
        />
      </config-cards>
      <v-card>
        <div class="toggle">
          <v-switch v-model="configs.DSM.enabled" color="blue" />
        </div>
        <v-card-title>{{ $t('settings.config.DSM.title') }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="configs.DSM.protocol"
                :items="['http', 'https']"
                :label="$t('settings.config.DSM.protocol')"
                hide-details
                outlined
                required
                :disabled="!configs.DSM.enabled"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="configs.DSM.host"
                outlined
                :label="$t('settings.config.DSM.host')"
                hide-details
                required
                :disabled="!configs.DSM.enabled"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="configs.DSM.port"
                :label="$t('settings.config.DSM.port')"
                type="number"
                hide-details
                outlined
                required
                :disabled="!configs.DSM.enabled"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="configs.DSM.account"
                :label="$t('settings.config.DSM.account')"
                hide-details
                outlined
                required
                :disabled="!configs.DSM.enabled"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="configs.DSM.password"
                :label="$t('settings.config.DSM.password')"
                type="password"
                hide-details
                outlined
                :disabled="!configs.DSM.enabled"
                required
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <div class="toggle">
          <v-switch v-model="configs.Netease2.enabled" color="blue" />
        </div>
        <v-card-title>{{ $t('settings.config.Netease2.title') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="configs.Netease2.server"
            :label="$t('settings.config.Netease2.server')"
            outlined
            required
          />
          <v-select
            v-model="configs.Netease2.login.method"
            :items="['email', 'phone']"
            :label="$t('settings.config.Netease2.method')"
            outlined
            required
          />
          <v-text-field
            v-model="configs.Netease2.login.account"
            :label="$t('settings.config.Netease2.account')"
            outlined
            required
          />
          <v-text-field
            v-model="configs.Netease2.login.password"
            :label="$t('settings.config.Netease2.password')"
            outlined
            type="password"
            required
          />
          <config-cards>
            <config-card
              v-model="configs.Netease2.isPremium"
              :title="$t('settings.config.Netease2.isPremium')"
              bg-color="#00f"
              icon="bxs-star"
            />
            <config-card
              v-model="configs.Netease2.dailyRecommendSongs.enabled"
              :title="$t('settings.config.Netease2.dailyRecommendSongs')"
              bg-color="#00f"
              icon="bxs-music"
            />
          </config-cards>

          <v-card outlined>
            <div class="toggle">
              <v-switch v-model="configs.Netease2.topPlaylist.enabled" color="blue" />
            </div>
            <v-card-title>{{ $t('settings.config.Netease2.topPlaylist') }}</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="configs.Netease2.topPlaylist.limit"
                :label="$t('settings.config.Netease2.limit')"
                type="number"
                required
                :disabled="!configs.Netease2.topPlaylist.enabled"
              />
              <v-select
                v-model="configs.Netease2.topPlaylist.order"
                :items="[{ text: $t('settings.config.Netease2.order_hot'), value: 'hot' }, { text: $t('settings.config.Netease2.order_time'), value: 'time' }]"
                :label="$t('settings.config.Netease2.order')"
                required
                :disabled="!configs.Netease2.topPlaylist.enabled"
              />
              <v-select
                v-model="configs.Netease2.topPlaylist.categories"
                :items="categoryList"
                :label="$t('settings.config.Netease2.categories')"
                chips
                multiple
                required
                :disabled="!configs.Netease2.topPlaylist.enabled"
              />
            </v-card-text>
          </v-card>
          <v-card outlined>
            <div class="toggle">
              <v-switch v-model="configs.Netease2.hqPlaylist.enabled" color="blue" />
            </div>
            <v-card-title>{{ $t('settings.config.Netease2.hqPlaylist') }}</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="configs.Netease2.hqPlaylist.limit"
                :label="$t('settings.config.Netease2.limit')"
                type="number"
                required
                :disabled="!configs.Netease2.hqPlaylist.enabled"
              />
              <v-select
                v-model="configs.Netease2.hqPlaylist.categories"
                :items="categoryList"
                :label="$t('settings.config.Netease2.categories')"
                multiple
                chips
                required
                :disabled="!configs.Netease2.hqPlaylist.enabled"
              />
            </v-card-text>
          </v-card>
          <v-card outlined>
            <div class="toggle">
              <v-switch v-model="configs.Netease2.dailyRecommendPlaylists.enabled" color="blue" />
            </div>
            <v-card-title>{{ $t('settings.config.Netease2.dailyRecommendPlaylists') }}</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="configs.Netease2.dailyRecommendPlaylists.limit"
                :label="$t('settings.config.Netease2.limit')"
                type="number"
                required
                :disabled="!configs.Netease2.dailyRecommendPlaylists.enabled"
              />
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
      <v-fab-transition>
        <v-btn
          color="primary"
          fab
          large
          dark
          bottom
          right
          fixed
          style="bottom: calc(16px + 69px)"
          @click="saveDialog = true"
        >
          <v-icon class="bx">bx-save</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-dialog v-model="saveDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="head">Save</span>
          </v-card-title>
          <v-card-text>The server will be restarted after saving.</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="saveDialog = false">Cancel</v-btn>
            <v-btn color="primary" text @click="saveConfig">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="restartDialog" persistent max-width="280">
        <v-card>
          <br />
          <p
            v-show="!restartCompleted"
            class="headline text-center font-weight-bold"
          >{{ $t('settings_restarting') }}</p>
          <p
            v-show="restartCompleted"
            class="headline text-center font-weight-bold"
          >{{ $t('settings_restart_completed') }}</p>
          <poka-loader v-show="!restartCompleted" />
          <br />
          <v-card-actions v-show="restartCompleted">
            <v-spacer />
            <v-btn text color="primary" @click="reload">{{ $t('settings_update_reconnect') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <pre v-if="configs.PokaPlayer.debug">{{ configs }}</pre>
    </div>
  </div>
</template>
<script>
import configCard from "@/components/config/configCard.vue";
import configCards from "@/components/config/configCards.vue";
export default {
  name: "adminConfig",
  components: {
    configCard,
    configCards
  },
  data() {
    return ({
      configs: {},
      categoryList: ['综艺', '流行', '影视原声', '华语', '清晨', '怀旧', '夜晚', '摇滚', '欧美', '清新', 'ACG', '浪漫', '民谣', '日语', '学习', '儿童', '电子', '韩语', '校园', '工作', '午休', '伤感', '粤语', '游戏', '舞曲', '说唱', '70后', '治愈', '下午茶', '放松', '轻音乐', '80后', '地铁', '90后', '孤独', '驾车', '爵士', '感动', '乡村', '网络歌曲', '运动', '兴奋', 'KTV', 'R&B/Soul', '旅行', '古典', '快乐', '经典', '散步', '民族', '翻唱', '酒吧', '安静', '吉他', '英伦', '思念', '金属', '钢琴', '器乐', '蓝调', '榜单', '00后', '雷鬼', '世界音乐', '拉丁', 'New Age', '古风', 'Bossa Nova'],
      saveDialog: false,
      restartDialog: false,
      restartCompleted: false
    })
  },
  created() {
    this.getConfig()
  },
  methods: {
    async getConfig() {
      let response = await this.axios.get(_setting(`server`) + '/pokaapi/v2/config/')
      this.configs = response.data
    },
    async saveConfig() {
      let { data } = await this.axios.post(_setting(`server`) + '/pokaapi/v2/config/save', this.configs)
      if (data.success) {
        this.saveDialog = false
        this.restartDialog = true
        this.restartCompleted = false
        this.restart()
      }
      else {
        this.saveDialog = false
        this.$snackbar('error')
      }
    },
    restart() {
      window._player.pause()
      this.restartDialog = true
      this.axios.post('/restart')
      window._socket.on('hello', () => {
        this.restartCompleted = true
      })
    },
    reload() {
      window.location.reload()
    }
  }

}
</script>
<style lang="sass" scoped>
.toggle
  position: absolute
  right: 16px
  top: 0
</style>