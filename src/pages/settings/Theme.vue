<script setup>
import { computed, watch, nextTick, reactive } from 'vue'
import { useCssVar, useStorage } from '@vueuse/core'

const pokaTheme = useStorage('poka.theme', { theme: 'light', cssText: `` })
const cssText = reactive(document.documentElement.style.cssText)
function computedCssVar(name, initialValue, unit = '') {
  return computed({
    get() {
      if (unit)
        return parseInt(document.documentElement.style.getPropertyValue(name)) || initialValue
      else
        return document.documentElement.style.getPropertyValue(name) || initialValue
    },
    set(value) {
      document.documentElement.style.setProperty(name, value + unit)
      pokaTheme.value.cssText = document.documentElement.style.cssText
    }
  })
}
const borderRadius = computedCssVar('--border-radius', 12, 'px')
const padding = computedCssVar('--padding', 8, 'px')
const minCardWidth = computedCssVar('--min-card-width', 128, 'px')
const primaryColor = computedCssVar('--primary-color', '#007bff')
const backgroundLayer1 = computedCssVar('--background-layer-1', '#ffffff')
const backgroundLayer2 = computedCssVar('--background-layer-2', '#f2f2f2')
const textColorValue = computedCssVar('--text-color-value', '51,51,51')

watch(pokaTheme, (value) => {
  let theme = {
    light: {
      backgroundLayer1: `#fff`,
      backgroundLayer2: `#f2f2f2`,
      textColorValue: `51,51,51`
    },
    dark: {
      backgroundLayer1: `#1e1e1e`,
      backgroundLayer2: `#2e2e2e`,
      textColorValue: `255,255,255`
    },
    red: {
      backgroundLayer1: `#f52547`,
      backgroundLayer2: `#d61837`,
      textColorValue: `255,255,255`
    }
  }

  if (Object.keys(theme).includes(value.theme)) {
    backgroundLayer1.value = theme[value.theme].backgroundLayer1
    backgroundLayer2.value = theme[value.theme].backgroundLayer2
    textColorValue.value = theme[value.theme].textColorValue
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
    </div>
    <div class="control">
      <select v-model="pokaTheme.theme">
        <option value="light">亮色系 </option>
        <option value="dark">暗色系 </option>
        <option value="red">新年紅 </option>
        <option value="custom">自訂 </option>
      </select>
    </div>
  </div>
  <template v-if="pokaTheme.theme == 'custom'">
    <div class="setting-item">
      <div class="content">
        <div class="title">文字顏色</div>
        <div class="description">
          調整頁面中的文字色系
        </div>
      </div>
      <div class="control">
        <select v-model="textColorValue">
          <optgroup label="darker"> </optgroup>

          <option value="0,0,0">最暗（0） </option>
          <option value="25,25,25">較暗（25） </option>
          <option value="51,51,51">預設（51） </option>
          <option value="255,255,255">純白（255） </option>
          <option value="230,230,230">較暗（230） </option>
          <option value="200,200,200">更暗（200） </option>

          <optgroup label="lighter"> </optgroup>
        </select>
      </div>
    </div>
    <div class="setting-item">
      <div class="content">
        <div class="title">顏色 </div>
        <div class="description">
          調整頁面中的顏色
        </div>
      </div>
      <div class="control">
        <input type="color" v-model="primaryColor" />
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
  <h4 style="margin-bottom: var(--padding)">預覽</h4>

  <p-cards style="margin: calc(var(--padding) * 2) 0">
    <p-card
      v-for="i in 4"
      imgSrc="/img/pwa-512x512.png"
      title="預覽"
      source="預覽" />
  </p-cards>
  <h4 style="margin-bottom: var(--padding)">樣式調整</h4>
  <div class="setting-item">
    <div class="content">
      <div class="title">卡片寬度</div>
      <div class="description">調整頁面中卡片的寬度，數值越小一行能夠顯示的卡片便會越多</div>
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
    // mix-blend-mode: exclusion
    z-index: 1
    filter: drop-shadow(0 0 1px rgba(0,0,0,.1))
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