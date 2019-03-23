<template>
  <div>
    <md-empty-state
      md-icon="devices_other"
      md-label="初始化您的 PokaPlayer"
      md-description="完成初始化後，您便能在此享受音樂！"
      v-if="step.welcome"
    >
      <md-button class="md-primary md-raised" @click="step.welcome=false">初始化</md-button>
      <!--<md-button class="md-raised" @click="step.welcome=false">上傳設定檔</md-button>-->
    </md-empty-state>
    <poka-header title="安裝嚮導" subtitle="PokaPlayer" v-if="step.welcome==false"/>
    <md-steppers
      :md-active-step.sync="active"
      md-vertical
      v-if="step.welcome==false"
      :md-linear="true"
      :md-dynamic-height="true"
    >
      <md-step id="step_description" md-label="說明" :md-done.sync="step.description">
        <h1>說明</h1>
        <p>本頁面將協助您進行初始設定，使 PokaPlayer 能夠連接至您的音樂服務，並開始享受音樂。</p>
        <p>也可以參考 Repo 內的 config-simple.json來設定，別忘了移除上頭的註解！</p>
        <h1>注意</h1>
        <p>請確認這些項目已開啟</p>
        <ul>
          <li>已開啟 Docker 自動重啟功能</li>
          <li>若您要使用網易雲服務</li>
          <ul>
            <li>請先架設好 gnehs/neteasecloudmusicapi-docker</li>
            <li>建議可設定好容器別名以方便連接</li>
          </ul>
          <li>若您要使用 DSM 的 Audio Station</li>
          <ul>
            <li>已安裝好並啟動 Audio Station</li>
            <li>DSM 已建立一個供 PokaPlayer 存取的帳號，並建議不要給予過多的權限（請確認兩步驟驗證已關閉）</li>
          </ul>
        </ul>
        <md-button class="md-raised md-primary" @click="setDone('description', 'pokaplayer')">下一步</md-button>
      </md-step>

      <md-step
        id="step_pokaplayer"
        md-label="PokaPlayer"
        :md-error="step.pokaplayer_err"
        :md-done.sync="step.pokaplayer"
      >
        <md-field>
          <label for="login-password">登入密碼</label>
          <md-input
            name="login-password"
            id="login-password"
            v-model="setting.PokaPlayer.password"
          />
        </md-field>
        <md-field>
          <label for="admin-password">管理員密碼</label>
          <md-input
            name="admin-password"
            id="admin-password"
            v-model="setting.PokaPlayer.adminPassword"
          />
        </md-field>
        <p>*請牢記您的密碼，若不慎遺失將無法復原</p>
        <p>
          *請設定較強的密碼，像是
          <code>correctcutebibibatterystaple</code> 之類由單字組成的密碼
        </p>
        <md-button class="md-raised md-primary" @click="setDone('pokaplayer', 'module')">下一步</md-button>
      </md-step>

      <md-step
        id="step_module"
        md-label="模組"
        :md-error="step.module_err"
        :md-done.sync="step.module"
      >
        <md-card>
          <md-card-content>
            <h2>啟用</h2>
            <md-divider/>
            <md-switch v-model="setting.DSM.enabled">DSM</md-switch>

            <div v-if="setting.DSM.enabled">
              <h2>連接到 DSM</h2>
              <md-divider/>
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field>
                    <label for="movie">通訊協定</label>
                    <md-select v-model="setting.DSM.protocol" name="movie" id="movie">
                      <md-option value="http://">http://</md-option>
                      <md-option value="https://">https://</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>網域、IP 或別名</label>
                    <md-input v-model="setting.DSM.host"/>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>端口</label>
                    <md-input v-model="setting.DSM.port" type="number"/>
                  </md-field>
                </div>
              </div>

              <h2>登入</h2>
              <md-divider/>
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field>
                    <label>帳號</label>
                    <md-input v-model="setting.DSM.account"/>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>密碼</label>
                    <md-input v-model="setting.DSM.password"/>
                  </md-field>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <br>
        <md-card>
          <md-card-content>
            <h2>啟用</h2>
            <md-divider/>
            <md-switch v-model="setting.Netease2.enabled">網易雲音樂</md-switch>

            <div v-if="setting.Netease2.enabled">
              <h2>連接到 NeteaseCloudMusicApi</h2>
              <md-divider/>
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field>
                    <label for="netease-protocol">通訊協定</label>
                    <md-select v-model="netease.protocol" name="netease-protocol">
                      <md-option value="http://">http://</md-option>
                      <md-option value="https://">https://</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>網域、IP 或別名</label>
                    <md-input v-model="netease.host"/>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>端口</label>
                    <md-input v-model="netease.port" type="number"/>
                  </md-field>
                </div>
              </div>
              <h2>帳號</h2>
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field>
                    <label for="neteaseloginby">E-mail 或 電話號碼</label>
                    <md-select v-model="netease.loginby" name="neteaseloginby">
                      <md-option value="email">以 E-mail 登入</md-option>
                      <md-option value="phone">以手機號碼登入</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field v-if="netease.loginby=='email'">
                    <label>E-mail</label>
                    <md-input v-model="setting.Netease2.login.email"/>
                  </md-field>
                  <md-field v-else>
                    <label>電話號碼</label>
                    <md-input v-model="setting.Netease2.login.phone"/>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>密碼</label>
                    <md-input v-model="setting.Netease2.login.password"/>
                  </md-field>
                </div>
              </div>
              <md-divider/>
              <h2>訂閱歌單</h2>
              <md-divider/>
              <md-switch v-model="setting.Netease2.topPlaylist.enabled">網友精選碟歌單</md-switch>
              <md-switch v-model="setting.Netease2.dailyRecommendSongs.enabled">每日推薦歌曲</md-switch>
              <md-switch v-model="setting.Netease2.dailyRecommendPlaylists.enabled">每日推薦歌單</md-switch>
              <md-switch v-model="setting.Netease2.hqPlaylist.enabled">精品歌單</md-switch>
            </div>
          </md-card-content>
        </md-card>
        <br>
        <md-button class="md-raised md-primary" @click="setDone('module', 'confirm')">下一步</md-button>
      </md-step>

      <md-step id="step_confirm" md-label="確認資料" :md-done.sync="step.confirm">
        <p>您可以在此備份目前的設定檔，以備不時之需</p>
        <md-button class="md-raised md-primary" @click="setDone('confirm');checkRestart()">完成</md-button>
      </md-step>
    </md-steppers>
    <md-empty-state md-icon="done" md-label="完成！" md-description="正在等待伺服器重啟" v-if="false">
      <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
    </md-empty-state>
    <md-empty-state
      md-icon="done"
      md-label="完成！"
      md-description="伺服器重啟完成，請點擊下面按鈕重新載入頁面"
      v-if="step==3"
    >
      <md-button class="md-primary md-raised" to="/">完成</md-button>
    </md-empty-state>
  </div>
</template>

<script>
export default {
  name: "Install",
  data: () => ({
    active: "step_description",
    step: {
      welcome: true,
      description: false,
      pokaplayer: false,
      pokaplayer_err: null,
      module: false,
      module_err: null,
      confirm: false
    },
    netease: {
      protocol: "",
      host: "netease",
      port: 443,
      loginby: "email"
    },
    setting: {
      PokaPlayer: {
        adminPassword: null,
        password: null,
        passwordSwitch: true,
        sessionSecret: Math.random()
          .toString(36)
          .substring(7),
        instantUpgradeProcess: true,
        debug: false
      },
      DSM: {
        enabled: true,
        protocol: null,
        host: "localhost",
        port: 443,
        account: null,
        password: null
      },
      Netease2: {
        enabled: true,
        server: null,
        isPremium: true,
        topPlaylist: {
          enabled: true,
          category: "ACG",
          limit: 5,
          order: "hot",
          image: "/img/topPlaylist.png"
        },
        dailyRecommendSongs: {
          enabled: true,
          image: "/img/dailyRecommendSongs.png"
        },
        dailyRecommendPlaylists: {
          enabled: true,
          image: "/img/dailyRecommendPlaylists.png"
        },
        hqPlaylist: {
          enabled: true,
          category: "ACG",
          limit: 20,
          image: "/img/hqPlaylist.png"
        },
        login: {
          email: null,
          phone: null,
          password: null
        }
      }
    }
  }),
  methods: {
    setDone(id, index) {
      this.step.pokaplayer_err = null;
      if (id == "pokaplayer") {
        if (
          !this.setting.PokaPlayer.password ||
          !this.setting.PokaPlayer.adminPassword
        ) {
          return (this.step.pokaplayer_err = "請輸入密碼");
        } else {
          this.step.pokaplayer_err = null;
          this.step[id] = true;
        }
      } else if (id == "module") {
        this.setting.Netease2.server =
          this.netease.protocol + this.netease.host + ":" + this.netease.port;
      } else {
        this.step[id] = true;
      }
      if (index) {
        this.active = "step_" + index;
      }
    },
    setError() {
      this.secondStepError = "發生錯誤";
    },
    async checkRestart() {}
  }
};
</script>