<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
const PokaAPI = inject('PokaAPI')
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.log.title') }}</p>
  </Teleport>
</template>