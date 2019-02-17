<template>
  <div>
    <headerWrapper
      :title="$t('settings_aboutAndHelp')"
      :subtitle="$t('settings_aboutAndHelp_description')"
    />
    <md-list class="md-double-line">
      <md-subheader>{{$t("settings_about")}}</md-subheader>

      <md-list-item>
        <md-icon class="outline-info"/>
        <div class="md-list-item-text">
          <span>{{$t("settings_about_version")}}</span>
          <span>{{poka_version}}</span>
        </div>
      </md-list-item>
      <md-list-item class="md-inset">
        <div class="md-list-item-text">
          <span>{{$t("settings_about_developer")}}</span>
          <span>{{poka_author}}</span>
        </div>
      </md-list-item>
    </md-list>
    <md-list>
      <md-subheader>{{$t("settings_about_externalLink")}}</md-subheader>
      <md-list-item href="https://github.com/gnehs/PokaPlayer/" target="_blank">
        <md-icon class="outline-link"/>
        <div class="md-list-item-text">
          <span>GitHub</span>
        </div>
      </md-list-item>
      <md-list-item href="https://github.com/gnehs/PokaPlayer/issues" target="_blank">
        <md-icon class="outline-feedback"/>
        <div class="md-list-item-text">
          <span>{{$t("settings_about_errorEeport")}}</span>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<style lang="sass" scoped>
  .md-list-item >*
      border-radius: 8px
  .md-list.md-theme-default 
    background-color: transparent

</style>
<script>
import headerWrapper from "@/components/header-wrapper";
export default {
  name: "About",
  data: () => ({
    poka_version: "",
    poka_author: ""
  }),
  components: {
    headerWrapper
  },
  created() {
    this.axios.get(localStorage.BASE_URL + "info/").then(response => {
      if (!response.data.version) this.$router.push("/login");
      this.poka_version = response.data.version;
      this.poka_author = response.data.author;
    });
  }
};
</script>