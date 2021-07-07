<template>
  <v-card class="mx-auto" width="350" style="border-radius: 8px;overflow: hidden;">
    <v-img class="poka-logo-banner" src="/img/loginHeader.svg" height="170px"></v-img>
    <v-card-text style="padding: 0;">
      <v-list subheader>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>info</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>PokaPlayer</v-list-item-title>
            <v-list-item-subtitle>{{poka_version}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item href="https://github.com/gnehs/PokaPlayer/" target="_blank">
          <v-list-item-avatar>
            <v-icon>mdi-github</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>GitHub</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://github.com/gnehs/PokaPlayer/graphs/contributors" target="_blank">
          <v-list-item-avatar>
            <v-icon>group</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{$t("settings_about_contributions")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://github.com/gnehs/PokaPlayer/issues" target="_blank">
          <v-list-item-avatar>
            <v-icon>error</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{$t("settings_about_errorEeport")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "poka-about",
  data: () => ({
    poka_version: "Loading..."
  }),
  created() {
    this.axios.get(_setting(`server`) + "/status/").then(response => {
      if (!response.data.version) this.$router.push("/login");
      this.poka_version = response.data.version;
    });
  }
};
</script>