<template>
  <v-btn @click="back" :text="!icon" rounded :large="!icon" :icon="icon">
    <v-icon :class="{ 'mr-2': !icon }" class="bx">bx-arrow-back</v-icon>
    <span v-show="!icon">{{ $t('back') }}</span>
  </v-btn>
</template>

<script>
export default {
  name: 'back',
  props: {
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
