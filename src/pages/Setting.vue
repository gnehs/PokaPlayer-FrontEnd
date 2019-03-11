<template>
  <div>
    <poka-header :title="$t('settings')"/>
    <md-list>
      <md-list-item @click="switchTheme">
        <md-icon>brightness_3</md-icon>
        <span class="md-list-item-text">Dark Mode</span>
        <md-switch v-model="settings.darkMode"/>
      </md-list-item>
    </md-list>
  </div>
</template>
<style lang="sass" scoped>
.md-list
	background-color: transparent
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