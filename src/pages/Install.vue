<template>
  <div v-if="!installed">
    <poka-header title="安裝嚮導" subtitle="PokaPlayer"/>
    <md-steppers
      :md-active-step.sync="active"
      md-vertical
      :md-linear="true"
      :md-dynamic-height="true"
      v-show="!step.server_restarting&&!step.server_restarted"
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
                    <label for="DSM-protocol">通訊協定</label>
                    <md-select v-model="setting.DSM.protocol" name="DSM-protocol" id="DSM-protocol">
                      <md-option value="http">http://</md-option>
                      <md-option value="https">https://</md-option>
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
        <md-button class="md-raised md-primary" @click="setDone('module', 'done')">下一步</md-button>
      </md-step>

      <md-step id="step_done" md-label="完成" :md-done.sync="step.done">
        <p>您可以在此備份目前的設定檔，以備不時之需</p>
        <p>點擊下方「完成」來提交設定檔</p>
        <md-button class="md-raised md-primary" @click="setDone('done');checkRestart()">完成</md-button>
        <md-button class="md-primary" @click="downloadSetting">下載設定檔</md-button>
      </md-step>
    </md-steppers>
    <md-empty-state
      md-icon="done"
      md-label="完成！"
      :md-description="step.server_restarting_description"
      v-if="step.server_restarting"
    >
      <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
    </md-empty-state>
    <md-empty-state
      md-icon="done"
      md-label="完成！"
      md-description="伺服器重啟完成，請點擊下面按鈕重新載入頁面"
      v-if="step.server_restarted"
    >
      <md-button class="md-primary md-raised" to="/">完成</md-button>
    </md-empty-state>
  </div>
  <md-empty-state
    md-icon="done"
    md-label="PokaPlayer 已安裝完成"
    md-description="若要修改設定，請手動刪除目錄下的 config.json"
    v-else
  >
    <md-button class="md-primary md-raised" to="/">首頁</md-button>
  </md-empty-state>
</template>

<script>
export default {
  name: "Install",
  data: () => ({
    active: "step_description",
    installed: false,
    step: {
      description: false,
      pokaplayer: false,
      pokaplayer_err: null,
      module: false,
      module_err: null,
      done: false,
      server_restarting: false,
      server_restarting_description: "正在提交設定檔",
      server_restarted: false
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
        port: 5000,
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
  created() {
    this.axios.get(_setting(`server`) + "/status/").then(response => {
      this.installed = response.data.install;
    });
  },
  methods: {
    setDone(id, index) {
      this.step.pokaplayer_err = null;
      if (id == "pokaplayer") {
        if (
          !this.setting.PokaPlayer.password ||
          !this.setting.PokaPlayer.adminPassword
        ) {
          this.step.pokaplayer_err = "請輸入密碼";
          return alert("請輸入密碼");
        } else {
          this.step.pokaplayer_err = null;
          this.step[id] = true;
        }
      } else if (id == "module") {
        this.step.module_err = null;
        this.setting.Netease2.server =
          this.netease.protocol +
          this.netease.host +
          ":" +
          this.netease.port +
          "/";
        return this.checkConnection();
      } else {
        this.step[id] = true;
      }
      if (index) {
        this.active = "step_" + index;
      }
    },
    async checkConnection() {
      let test_dsm, test_netease;
      try {
        test_dsm = this.setting.DSM.enabled
          ? (await this.axios.post("/installapi/dsm", this.setting.DSM)).data
          : true;
        test_netease = this.setting.Netease2.enabled
          ? (await this.axios.post(
              "/installapi/netease2",
              this.setting.Netease2
            )).data
          : true;
        if (
          test_dsm &&
          test_dsm != "error" &&
          test_netease &&
          test_netease != "error"
        ) {
          this.step.module = true;
          this.active = "step_done";
        } else {
          let _Error = [];
          test_dsm == "error" || !test_dsm
            ? _Error.push("無法連線至 DSM 或帳號密碼有誤")
            : null;
          test_netease == "error" || !test_netease
            ? _Error.push("無法連線至網易雲或帳號密碼有誤")
            : null;
          this.step.module_err = _Error.join(", ");
          alert(_Error.join(", "));
        }
      } catch (e) {
        this.step.module_err = e;
        console.error("e", e);
      }
    },
    async checkRestart() {
      this.step.server_restarting = true;
      let configPost = (await this.axios.post(
        "/installapi/config",
        this.setting
      )).data;
      if (configPost == "done")
        this.step.server_restarting_description =
          "正在等待伺服器重啟，請勿離開本頁面";
      window._socket.on("hello", () => {
        this.step.server_restarting = false;
        this.step.server_restarted = true;
      });
    },
    downloadSetting() {
      let data = new Blob([JSON.stringify(this.setting, null, "\t")], {
        type: "application/json"
      });
      let url = URL.createObjectURL(data);
      let link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "config.json");
      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>