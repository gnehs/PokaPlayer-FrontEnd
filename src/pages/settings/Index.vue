<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
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
      <div class="title">{{ $t(`language`) }}</div>
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
  <div>
    <p-list-items single-row>
      <p-list-item to="/settings/theme" tabindex="0">
        <p-list-item-icon-btn>
          <i class='bx bx-brush-alt'></i>
        </p-list-item-icon-btn>
        <p-list-item-content
          title="主題"
          description="設定您的主題色彩" />
      </p-list-item>
    </p-list-items>
  </div>
</template>