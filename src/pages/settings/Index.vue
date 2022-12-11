<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const borderRadius = computed({
  get() {
    return parseInt(document.documentElement.style.getPropertyValue('--border-radius') || 12)
  },
  set(value) {
    document.documentElement.style.setProperty('--border-radius', value + 'px')
  }
})
const padding = reactive(parseInt(document.documentElement.style.getPropertyValue('--padding')) || 8)
function updateCSSVariables(e) {
  document.documentElement.style.setProperty('--padding', e.target.value + 'px')
}
const { locale, availableLocales, getLocaleMessage } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})
console.log(useI18n({
  inheritLocale: true,
  useScope: 'global'
}))
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('nav.settings') }}</p>
  </Teleport>
  <h1>語言 {{ locale }}</h1>
  <select v-model="locale">
    <!-- TODO: Wait for issue #1235 to be fixed https://github.com/intlify/vue-i18n-next/issues/1235 -->
    <option :value="locale" v-for="locale of availableLocales">{{ getLocaleMessage(locale).language_name({ normalize: (s) => s[0] }) }}
    </option>
  </select>
  <h1>實驗室</h1>
  <p>邊框半徑 </p>
  <input type="range" v-model="borderRadius" min="0" max="100" style="width: 256px" />
  <p>間距 </p>
  <input type="range" v-model="padding" min="0" max="24" style="width: 256px" @change="updateCSSVariables" />
</template>