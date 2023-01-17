<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
const { locale, availableLocales, getLocaleMessage } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
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
      <p-select v-model="locale">
        <!-- TODO: Wait for issue #1235 to be fixed https://github.com/intlify/vue-i18n-next/issues/1235 -->
        <option :value="locale" v-for="locale of availableLocales">
          {{ getLocaleMessage(locale).language_name({ normalize: (s) => s[0] }) }}
        </option>
      </p-select>
    </div>
  </div>
  <div>
    <p-list-items>
      <p-list-item to="/settings/quality" tabindex="0">
        <p-list-item-icon-btn>
          <i class='bx bx-music'></i>
        </p-list-item-icon-btn>
        <p-list-item-content
          :title="$t(`settings.quality.title`)"
          :description="$t(`settings.quality.description`)" />
      </p-list-item>
      <p-list-item to="/settings/theme" tabindex="0">
        <p-list-item-icon-btn>
          <i class='bx bx-brush-alt'></i>
        </p-list-item-icon-btn>
        <p-list-item-content
          :title="$t(`settings.theme.title`)"
          :description="$t(`settings.theme.description`)" />
      </p-list-item>
      <p-list-item to="/settings/pins" tabindex="0">
        <p-list-item-icon-btn>
          <i class='bx bx-pin'></i>
        </p-list-item-icon-btn>
        <p-list-item-content
          :title="$t(`settings.pins.title`)"
          :description="$t(`settings.pins.description`)" />
      </p-list-item>
      <p-list-item to="/settings/user" tabindex="0">
        <p-list-item-icon-btn>
          <i class='bx bx-user'></i>
        </p-list-item-icon-btn>
        <p-list-item-content
          :title="$t(`settings.user.title`)"
          :description="$t(`settings.user.description`)" />
      </p-list-item>
      <template v-if="userInfo.role === 'admin'">
        <p-list-item to="/settings/system" tabindex="0">
          <p-list-item-icon-btn>
            <i class='bx bx-server'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="$t(`settings.system.title`)"
            :description="$t(`settings.system.description`)" />
        </p-list-item>
        <p-list-item to="/settings/users" tabindex="0">
          <p-list-item-icon-btn>
            <i class='bx bx-group'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="$t(`settings.users.title`)"
            :description="$t(`settings.users.description`)" />
        </p-list-item>
        <p-list-item to="/settings/log" tabindex="0">
          <p-list-item-icon-btn>
            <i class='bx bx-file'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="$t(`settings.log.title`)"
            :description="$t(`settings.log.description`)" />
        </p-list-item>
      </template>
    </p-list-items>
  </div>
</template>