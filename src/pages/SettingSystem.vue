<template>
  <div>
    <poka-header :title="$t('settings')" :subtitle="$t('settings_systemAndUpdate')"/>
    <md-list>
      <md-list-item to="/setting">
        <md-icon>arrow_back</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('back')}}</span>
        </div>
      </md-list-item>
      <md-subheader>{{$t('settings_account')}}</md-subheader>
      <md-list-item @click="logout">
        <md-icon>exit_to_app</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_logout')}}</span>
        </div>
      </md-list-item>
      <md-subheader>{{$t('settings_system')}}</md-subheader>
      <md-list-item @click="restartConfirmActive=true">
        <md-icon>autorenew</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_restart')}}</span>
        </div>
      </md-list-item>
    </md-list>
    <md-list class="md-double-line" style="padding-top:0">
      <md-list-item @click="showUpdateDialog=true">
        <md-icon>system_update</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_update')}}</span>
          <span>{{checkUpadteStatus}}</span>
        </div>
      </md-list-item>
    </md-list>

    <md-dialog-confirm
      :md-active.sync="restartConfirmActive"
      :md-title="$t('settings_restartDialog_title')"
      :md-content="$t('settings_updateDialog_note')"
      :md-cancel-text="$t('cancel')"
      :md-confirm-text="$t('ok')"
      @md-confirm="restart"
    />

    <md-dialog :md-active.sync="showUpdateDialog" v-if="newVersion.tag">
      <md-dialog-title>{{$t("settings_update_update2", { version: this.newVersion.tag})}}</md-dialog-title>
      <p v-html="newVersion.body"/>
      <p style="padding:0 24px;">{{$t('settings_updateDialog_note')}}</p>
      <md-dialog-actions>
        <md-button @click="showUpdateDialog = false">{{$t('cancel')}}</md-button>
        <md-button
          class="md-primary"
          @click="showUpdateDialog = false;update"
        >{{$t('settings_update')}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<style lang="sass" scoped>
.md-list
	padding-bottom: 0
	.md-list-item
		border-radius: 8px !important
		overflow: hidden
		transition: all 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95)
</style>

<script>
export default {
  name: "SettingSystem",
  data: () => ({
    checkUpadteStatus: i18n.t("settings_update_checking4updates"),
    restartConfirmActive: false,
    showUpdateDialog: false,
    poka_version: null,
    newVersion: {
      prerelease: null,
      tag: null,
      body: null
    }
  }),
  created() {
    this.axios.get(_setting(`server`) + "/info/").then(response => {
      this.poka_version = response.data.version;
      this.fetchNewVersion();
    });
  },
  methods: {
    fetchNewVersion() {
      fetch("https://api.github.com/repos/gnehs/PokaPlayer/releases")
        .then(e => e.json())
        .then(e => {
          if (this.compareVersion(this.poka_version, e[0].tag_name)) {
            this.newVersion.prerelease = e[0].prerelease;
            this.newVersion.tag = e[0].tag_name;
            this.newVersion.body = new (require("showdown")).Converter().makeHtml(
              e[0].body
            );
            this.checkUpadteStatus = i18n.t("settings_update_update2", {
              version: this.newVersion.tag
            });
          } else {
            this.checkUpadteStatus = i18n.t("settings_update_latestVersion");
          }
        })
        .catch(e => console.error(e));
    },
    logout() {
      this.axios("/logout").then(e => this.$router.push("/login"));
    },
    update() {
      this.axios.get("/upgrade");
    },
    restart() {
      this.axios.post("/restart");
    },
    compareVersion(local, remote) {
      local = local.split(".").map(e => parseInt(e));
      remote = remote.split(".").map(e => parseInt(e));
      //版本號加權對比
      local = local[0] * 1000 * 1000 + local[1] * 1000 + local[2];
      remote = remote[0] * 1000 * 1000 + remote[1] * 1000 + remote[2];
      return remote > local;
    }
  }
};
</script>