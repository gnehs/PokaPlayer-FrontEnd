<template>
  <v-btn @click="back" :text="!icon" rounded :large="!icon" :dark="dark" :icon="icon" color="primary">
    <v-icon :class="{ 'mr-2': !icon }">arrow_back</v-icon>
    <span v-show="!icon">{{ $t('back') }}</span>
  </v-btn>
</template>

<script>
export default {
  name: 'back',
  props: {
    dark: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    to: { type: String }
  },
  methods: {
    back() {
      if (this.to) {
        this.$router.push(this.to)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style></style>
