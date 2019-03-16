<template>
  <div>
    <poka-header :title="$t('settings')" :subtitle="$t('settings_lang')"/>
    <md-list>
      <md-list-item to="/setting">
        <md-icon>arrow_back</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('back')}}</span>
        </div>
      </md-list-item>
      <md-list-item
        v-for="(lang,index) of languages"
        :key="`lang${lang}-${index}`"
        @click="setLang(lang)"
      >
        <md-icon>translate</md-icon>
        <div class="md-list-item-text">
          <span>{{$t('title',lang)}}</span>
        </div>
        <md-icon v-show="currentLang==lang">check</md-icon>
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
  name: "SettingLang",
  data: () => ({
    languages: Object.keys(window.i18n.messages),
    currentLang: window.i18n.locale
  }),
  methods: {
    setLang(lang) {
      window.i18n.locale = lang;
      this.currentLang = lang;
      window._setting("lang", lang);
    }
  }
};
</script>