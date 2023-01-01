<script setup>
import { computed, watch, nextTick, ref } from 'vue'
import { useStorage } from '@vueuse/core'

const pokaTheme = useStorage('poka.theme', { theme: 'light', cssText: ``, })
const themePresent = ref({
  light: {
    '--background-layer-1': `#ffffff`,
    '--background-layer-2': `#f2f2f2`,
    '--text-color-value': `51,51,51`
  },
  dark: {
    '--background-layer-1': `#1e1e1e`,
    '--background-layer-2': `#2e2e2e`,
    '--text-color-value': `255,255,255`
  },
  black: {
    '--background-layer-1': `#0b0b0b`,
    '--background-layer-2': `#000000`,
    '--text-color-value': `255,255,255`
  },
  ocean: {
    '--background-layer-1': `#393644`,
    '--background-layer-2': `#302e38`,
    '--text-color-value': `230,230,255`
  },
})
const cssVarTheme = ref({
  '--border-radius': '12px',
  '--padding': '8px',
  '--min-card-width': '128px',
  '--primary-color': '#007bff',
  '--background-layer-1': '#ffffff',
  '--background-layer-2': '#f8f9fa',
  '--text-color-value': '51,51,51',
})
for (let key in cssVarTheme.value) {
  cssVarTheme.value[key] = document.documentElement.style.getPropertyValue(key) || cssVarTheme.value[key]
}

watch(pokaTheme, (value, prevValue) => {
  let theme = themePresent.value[value.theme]
  if (theme) {
    for (let [key, value] of Object.entries(theme)) {
      cssVarTheme.value[key] = value
    }
  }
})
watch(cssVarTheme, (value) => {
  for (let key in value) {
    document.documentElement.style.setProperty(key, value[key])
  }
  nextTick(() => {
    pokaTheme.value.cssText = document.documentElement.style.cssText
  })
}, { deep: true })

</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.theme.title') }}</p>
  </Teleport>
  <h4 style="margin-bottom: var(--padding)">{{ $t('settings.theme.themeAndColor') }}</h4>
  <div class="theme-preview-items">
    <div class="theme-preview-item"
      v-for="[name, value] of Object.entries(themePresent)"
      @click="pokaTheme.theme = name"
      :style="Object.entries(value).map(([key, value]) => `${key}:${value}`).join(';')"
      tabindex="0">
      <div class="layer-1">
        <i class='bx bx-check' v-show="pokaTheme.theme == name"></i>
      </div>
      <div class="layer-2">
        Aa
      </div>
    </div>
    <div class="theme-preview-item"
      @click="pokaTheme.theme = 'custom'"
      tabindex="0">
      <div class="layer-1">
        <i class='bx bx-check' v-if="pokaTheme.theme == 'custom'"></i>
      </div>
      <div class="layer-2">
        {{ $t('settings.theme.custom') }}
      </div>
    </div>
  </div>
  <template v-if="pokaTheme.theme == 'custom'">
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.theme.textColor') }}</div>
      </div>
      <div class="control">
        <p-select v-model="cssVarTheme['--text-color-value']">
          <optgroup label="🌑"> </optgroup>
          <option value="0,0,0">0 </option>
          <option value="25,25,25">25 </option>
          <option value="51,51,51">51 ({{ $t('settings.theme.default') }}) </option>
          <option value="200,200,200">200</option>
          <option value="230,230,230">230 </option>
          <option value="255,255,255">255 </option>
          <optgroup label="☀️"> </optgroup>
        </p-select>
      </div>
    </div>
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.theme.color') }} </div>
      </div>
      <div class="control">
        <input type="color" v-model="cssVarTheme['--primary-color']" />
        <input type="color" v-model="cssVarTheme['--background-layer-1']" />
        <input type="color" v-model="cssVarTheme['--background-layer-2']" />
      </div>
    </div>
  </template>
  <h4 style="margin-bottom: var(--padding)">{{ $t('settings.theme.preview') }}</h4>

  <p-cards style="margin: calc(var(--padding) * 2) 0">
    <p-card
      v-for="i in 4"
      imgSrc="/img/pwa-512x512.png"
      :title="$t('settings.theme.preview')"
      :source="$t('settings.theme.preview')" />
  </p-cards>
  <h4 style="margin-bottom: var(--padding)">{{ $t('settings.theme.style') }}</h4>
  <div class="setting-item">
    <div class="content">
      <div class="title">{{ $t('settings.theme.cardWidth') }}</div>
    </div>
    <div class="control">
      <p-select v-model="cssVarTheme['--min-card-width']">
        <option value="72px">72px </option>
        <option value="96px">96px </option>
        <option value="128px">128px ({{ $t('settings.theme.default') }}) </option>
        <option value="160px">160px </option>
        <option value="192px">192px </option>
      </p-select>
    </div>
  </div>
  <div class="setting-item">
    <div class="content">
      <div class="title">{{ $t('settings.theme.borderRadius') }}</div>
    </div>
    <div class="control">
      <p-select v-model="cssVarTheme['--border-radius']">
        <option value="4px">4px </option>
        <option value="8px">8px </option>
        <option value="12px">12px ({{ $t('settings.theme.default') }})</option>
        <option value="16px">16px </option>
        <option value="24px">24px </option>
      </p-select>
    </div>
  </div>
  <div class="setting-item">
    <div class="content">
      <div class="title">{{ $t('settings.theme.padding') }}</div>
    </div>
    <div class="control">
      <p-select v-model="cssVarTheme['--padding']">
        <option value="4px">4px </option>
        <option value="8px">8px ({{ $t('settings.theme.default') }})</option>
        <option value="10px">10px </option>
        <option value="12px">12px </option>
        <option value="16px">16px </option>
      </p-select>
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
.theme-preview-items
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(var(--min-card-width), 1fr))
  grid-gap: calc(var(--padding) * 2)
  margin: calc(var(--padding) * 2) 0
  .theme-preview-item
    display: grid
    grid-template-columns: 1fr 1fr
    justify-content: center
    border-radius: var(--border-radius)
    overflow: hidden
    background-color: var(--background-layer-2)
    color: rgba(var(--text-color-value),1)
    border: 1px solid var(--background-layer-2)
    transition: transform var(--transition)
    cursor: pointer
    .layer-1,.layer-2
      padding: var(--padding)
      height: 64px
      display: flex
      align-items: center
      justify-content: center
      font-size: 18px
    .layer-1
      background-color: var(--background-layer-1)
      font-size: 24px
    .layer-2
      background-color: var(--background-layer-2)
    &:hover
      transform: scale(1.05)
    &:active
      transform: scale(1)
</style>