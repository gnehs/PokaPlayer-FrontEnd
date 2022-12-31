<script setup>
import { ref, computed, watch } from 'vue'
import { useCssVar } from '@vueuse/core'
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
const backgroundLayer1 = useCssVar('--background-layer-1', document.querySelector('html'), { initialValue: '#ffffff' })
const backgroundLayer2 = useCssVar('--background-layer-2', document.querySelector('html'), { initialValue: '#f2f2f2' })
const textColorValue = useCssVar('--text-color-value', document.querySelector('html'), { initialValue: '51,51,51' })
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
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.theme.title') }}</p>
  </Teleport>
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
        <option value="red">新年紅 </option>
        <option value="custom">自訂 </option>
      </select>
    </div>
  </div>
  <template v-if="theme == 'custom'">
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
        <div class="title">背景顏色 </div>
        <div class="description">
          調整頁面中的背景顏色
        </div>
      </div>
      <div class="control">
        <input type="color" v-model="backgroundLayer1" list="presetColors" />
        <input type="color" v-model="backgroundLayer2" list="presetColors" />
        <datalist id="presetColors">
          <option>#ffffff</option>
          <option>#f2f2f2</option>
          <option>#eeeeee</option>
          <option>#333333</option>
          <option>#2e2e2e</option>
          <option>#222222</option>
          <option>#1e1e1e</option>
          <option>#111111</option>
        </datalist>
      </div>
    </div>
  </template>
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
<style lang="sass">
input[type="color"]
  -webkit-appearance: none
  border: none
  width: 32px
  height: 32px
  border-radius: var(--border-radius)
  overflow: hidden
  transition: all var(--transition)
  cursor: pointer
  position: relative
  &:before
    content: "\ea07"
    position: absolute
    font-family: boxicons!important
    font-size: 16px
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    color: #fff
    mix-blend-mode: exclusion
    z-index: 1
  &::after
    // border
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    border: 1px solid rgba(255,255,255,.1)
    mix-blend-mode: exclusion
    border-radius: var(--border-radius)
  &:hover
    transform: scale(1.1)
  &:focus
    outline: none
    transform: scale(1.1)
    box-shadow: var(--box-shadow)

input[type="color"]::-webkit-color-swatch-wrapper
  padding: 0
  transform: scale(2)

input[type="color"]::-webkit-color-swatch
  border: none

</style>