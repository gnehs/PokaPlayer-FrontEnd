<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const borderRadius = computed({
  get() {
    return parseInt(document.documentElement.style.getPropertyValue('--border-radius')) || 12
  },
  set(value) {
    document.documentElement.style.setProperty('--border-radius', value + 'px')
  }
})
const padding = computed({
  get() {
    return parseInt(document.documentElement.style.getPropertyValue('--padding')) || 8
  },
  set(value) {
    document.documentElement.style.setProperty('--padding', value + 'px')
  }
})
const minCardWidth = computed({
  get() {
    return parseInt(document.documentElement.style.getPropertyValue('--min-card-width')) || 128
  },
  set(value) {
    document.documentElement.style.setProperty('--min-card-width', value + 'px')
  }
})
const backgroundLayer1 = computed({
  get() {
    return document.documentElement.style.getPropertyValue('--background-layer-1') || `#fff`
  },
  set(value) {
    document.documentElement.style.setProperty('--background-layer-1', value)
  }
})
const backgroundLayer2 = computed({
  get() {
    return document.documentElement.style.getPropertyValue('--background-layer-2') || `#f2f2f2`
  },
  set(value) {
    document.documentElement.style.setProperty('--background-layer-2', value)
  }
})
const textColorValue = computed({
  get() {
    return document.documentElement.style.getPropertyValue('--text-color-value') || `51,51,51`
  },
  set(value) {
    document.documentElement.style.setProperty('--text-color-value', value)
  }
})
const theme = ref('light')
watch(theme, (value) => {
  if (value === 'light') {
    backgroundLayer1.value = `#fff`
    backgroundLayer2.value = `#f2f2f2`
    textColorValue.value = `51,51,51`
  }
  if (value === 'dark') {
    backgroundLayer1.value = `#1e1e1e`
    backgroundLayer2.value = `#2e2e2e`
    textColorValue.value = `255,255,255`
  }
  if (value === 'red') {
    backgroundLayer1.value = `#f52547`
    backgroundLayer2.value = `#d61837`
    textColorValue.value = `255,255,255`
  }
})
const { locale, availableLocales, getLocaleMessage } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('nav.settings') }}</p>
  </Teleport>
  <div class="setting-item">
    <div class="content">
      <div class="title">語言</div>
      <div class="description"></div>
    </div>
    <div class="control">
      <select v-model="locale">
        <!-- TODO: Wait for issue #1235 to be fixed https://github.com/intlify/vue-i18n-next/issues/1235 -->
        <option :value="locale" v-for="locale of availableLocales">
          {{ getLocaleMessage(locale).language_name({ normalize: (s) => s[0] }) }}
        </option>
      </select>
    </div>
  </div>
  <h4 style="margin-bottom: var(--padding)">主題色彩</h4>
  <div class="setting-item">
    <div class="content">
      <div class="title">主題</div>
      <div class="description">
        PokaPlayer 所提供的預設主題，包含了亮色系和暗色系兩種。
      </div>
    </div>
    <div class="control">
      <select v-model="theme">
        <option value="light">亮色系 </option>
        <option value="dark">暗色系 </option>
        <option value="red">⛄️雪人胖胖 </option>
      </select>
    </div>
  </div>
  <div class="setting-item">
    <div class="content">
      <div class="title">文字顏色</div>
      <div class="description">
        調整頁面中的文字色系
      </div>
    </div>
    <div class="control">
      <select v-model="textColorValue">
        <optgroup label="適用於亮色系">
          <option value="51,51,51">預設（51） </option>
          <option value="25,25,25">較暗（25） </option>
          <option value="0,0,0">最暗（0） </option>
        </optgroup>
        <optgroup label="適用於暗色系">
          <option value="255,255,255">純白（255） </option>
          <option value="230,230,230">較暗（230） </option>
          <option value="200,200,200">更暗（200） </option>
        </optgroup>
      </select>
    </div>
  </div>
  <div class="setting-item">
    <div class="content">
      <div class="title">背景顏色 1</div>
      <div class="description">
        調整頁面中的背景顏色
      </div>
    </div>
    <div class="control">
      <select v-model="backgroundLayer1">
        <optgroup label="亮色系">
          <option value="#fff">預設（#fff） </option>
          <option value="#f2f2f2">較深（#f2f2f2） </option>
          <option value="#eee">更深（#eee） </option>
        </optgroup>
        <optgroup label="暗色系">
          <option value="#333">深灰（#333） </option>
          <option value="#222">更深（#222） </option>
          <option value="#111">黑色（#111） </option>
          <option value="#000">純黑（#000） </option>
        </optgroup>
      </select>
    </div>
  </div>
  <div class="setting-item">
    <div class="content">
      <div class="title">背景顏色 2</div>
      <div class="description"> 調整頁面中的背景顏色</div>
    </div>
    <div class="control">
      <select v-model="backgroundLayer2">
        <optgroup label="亮色系">
          <option value="#fff">純白（#fff） </option>
          <option value="#f2f2f2">預設（#f2f2f2） </option>
          <option value="#eee">較深（#eee） </option>
        </optgroup>
        <optgroup label="暗色系">
          <option value="#333">深灰（#333） </option>
          <option value="#222">更深（#222） </option>
          <option value="#111">黑色（#111） </option>
          <option value="#000">純黑（#000） </option>
        </optgroup>
      </select>
    </div>
  </div>
  <h4 style="margin-bottom: var(--padding)">樣式調整</h4>
  <div class="setting-item">
    <div class="content">
      <div class="title">最小卡片寬度</div>
      <div class="description">調整頁面中卡片的最小寬度，也就是調整一排中最多顯示幾張卡片，數值越小卡片越多</div>
    </div>
    <div class="control">
      <select v-model="minCardWidth">
        <option :value="72">迷你（72px） </option>
        <option :value="96">小（96px） </option>
        <option :value="128">預設（128px） </option>
        <option :value="160">大（160px） </option>
        <option :value="192">超大（192px） </option>
      </select>
    </div>
  </div>
  <div class="setting-item">
    <div class="content">
      <div class="title">邊框半徑</div>
      <div class="description">調整圓角大小</div>
    </div>
    <div class="control">
      <select v-model="borderRadius">
        <option :value="4">方正（4px） </option>
        <option :value="8">輕微圓角（8px） </option>
        <option :value="12">預設（12px） </option>
        <option :value="16">較大圓角（16px） </option>
        <option :value="24">極大圓角（24px） </option>
      </select>
    </div>
  </div>
  <div class="setting-item">
    <div class="content">
      <div class="title">間距</div>
      <div class="description">調整元件間的空隙</div>
    </div>
    <div class="control">
      <select v-model="padding">
        <option :value="4">較小（4px） </option>
        <option :value="8">預設（8px） </option>
        <option :value="10">稍大（10px） </option>
        <option :value="12">極大（12px） </option>
        <option :value="16">巨大（16px） </option>
      </select>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.setting-item
  padding: calc(var(--padding) * 2)
  margin-bottom: calc(var(--padding) * 2)
  border: 1px solid rgba(var(--text-color-value),.1)
  box-shadow: var(--box-shadow)
  border-radius: var(--border-radius)
  display: flex
  align-items: center
  gap: calc(var(--padding) * 2)
  .content
    flex: 1
    .title
      font-weight: bold
    .description
      opacity: .75
  .control
    width: 200px
    select
      width: 100%
      height: 100%
      border: none
      background: transparent
      font-size: 1rem
      color: var(--text-color)
      appearance: none
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")
      background-repeat: no-repeat
      background-position: right 0.5rem top 50%, 0 0
      background-size: 1.5em auto, 100%

      padding: var(--padding) calc(var(--padding) * 2)
      border: 1px solid rgba(var(--text-color-value),.1)
      border-radius: var(--border-radius)
      &:focus
        outline: none
</style>