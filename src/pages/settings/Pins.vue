<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
const PokaAPI = inject('PokaAPI')
const pins = ref(null)
async function getData() {
  let data = await PokaAPI.getPins()
  pins.value = data
}
async function unpin(item) {
  let confirm = window.confirm('Are you sure you want to unpin this item?')
  if (confirm) {
    await PokaAPI.unpin(item)
    await getData()
  }
}
onMounted(async () => {
  await getData()
})
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.pins.title') }}</p>
  </Teleport>
  <p style="margin-bottom: calc(var(--padding) * 2)">{{ $t('settings.pins.intro') }}</p>
  <p-list-items>
    <p-list-item tabindex="0" v-for="item of pins">
      <p-list-item-img :src="item.cover" />
      <p-list-item-content
        :title="item.name"
        :description="`${$t(`nav.${item.type}s`)} | ${$t(`source.${item.source}`)}`" />
      <template #actions>
        <p-list-item-icon-btn @click.stop="unpin(item)">
          <i class='bx bx-trash'></i>
        </p-list-item-icon-btn>
      </template>
    </p-list-item>
  </p-list-items>
</template>