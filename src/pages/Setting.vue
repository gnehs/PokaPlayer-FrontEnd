<template>
  <div>
    <poka-header :title="$t('settings')" :subtitle="'PokaPlayer'"/>
    <md-list>
      <md-subheader>常用</md-subheader>
      <md-list-item @click="switchTheme">
        <md-icon>brightness_3</md-icon>
        <span class="md-list-item-text">Dark Mode</span>
        <md-switch v-model="settings.darkMode"/>
      </md-list-item>
    </md-list>
    <md-list class="md-double-line">
      <md-subheader>{{$t('settings')}}</md-subheader>
      <md-list-item to="/setting/network">
        <md-icon>cloud</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_network')}}</span>
          <span>{{$t('settings_network_description')}}</span>
        </div>
      </md-list-item>
      <md-list-item>
        <md-icon>format_paint</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_customize')}}</span>
          <span>{{$t('settings_customize_description')}}</span>
        </div>
      </md-list-item>
      <md-list-item>
        <md-icon>translate</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_lang')}}</span>
          <span>{{$t('settings_lang_description')}}</span>
        </div>
      </md-list-item>
      <md-list-item>
        <md-icon>system_update</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_systemAndUpdate')}}</span>
          <span>{{$t('settings_systemAndUpdate_description')}}</span>
        </div>
      </md-list-item>
      <md-list-item to="/about">
        <md-icon>info</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('settings_aboutAndHelp')}}</span>
          <span>{{$t('settings_aboutAndHelp_description')}}</span>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>
<style lang="sass" scoped>
.md-list
	.md-list-item
		border-radius: 8px !important
		overflow: hidden
		transition: all 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95)
</style>

<script>
export default {
  name: "Setting",
  data: () => ({
    settings: {
      darkMode: window._setting("darkMode")
    }
  }),
  methods: {
    switchTheme() {
      this.settings.darkMode = !this.settings.darkMode;
      window._setting("darkMode", this.settings.darkMode);
      this.settings.darkMode
        ? window._theme.switchToDark()
        : window._theme.switchToLight();
    }
  }
};
</script>