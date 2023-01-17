<script setup>
import { useStorage } from '@vueuse/core'
const quality = useStorage('poka.quality', `original`)
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.quality.title') }}</p>
  </Teleport>
  <p-list-items single-row>
    <p-list-item tabindex="0" v-for="item of ['low', 'medium', 'high', 'original']" @click="quality = item">
      <p-list-item-icon-btn>
        <i v-if="quality == item" class='bx bx-checkbox-checked'></i>
        <i v-else class='bx bx-checkbox'></i>
      </p-list-item-icon-btn>
      <p-list-item-content
        :title="$t(`settings.quality.${item}.title`)"
        :description="$t(`settings.quality.${item}.description`)" />
    </p-list-item>
  </p-list-items>
</template>