<template>
  <div>
    <template v-for="(item, index) of data">
      <div
        v-for="itemName of Object.keys(item).filter((x) => Array.isArray(item[x]) && item[x].length)"
        class="mb-8"
        :key="index + itemName"
      >
        <div class="title">{{ $t(item.title) }}</div>
        <div class="caption mb-2">{{ $t(itemName.substring(0, itemName.length - 1)) }}</div>
        <div :is="`poka-parse-${itemName}`" :data="item[itemName]" hide-fab />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'poka-parse-home',
  props: ['data'],
  data: () => ({ dialog: false })
}
</script>
