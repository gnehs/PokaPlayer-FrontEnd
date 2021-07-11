<template>
  <div>
    <template v-for="(item, index) of data">
      <v-card v-for="itemName of Object.keys(item).filter((x) => Array.isArray(item[x]) && item[x].length)" style="border-radius: 16px !important" :key="index + itemName">
        <v-card-title>{{ $t(item.title) }}</v-card-title>
        <v-card-subtitle>{{ $t(itemName.substring(0, itemName.length - 1)) }}</v-card-subtitle>
        <v-card-text>
          <div>
            <div :is="`poka-parse-${itemName}`" :data="item[itemName]" hide-fab />
          </div>
        </v-card-text>
      </v-card>
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
