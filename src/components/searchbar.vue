<template>
  <div
    style="display: flex; justify-content: flex-end"
    :style="{ width: $vuetify.breakpoint.mdAndUp ? 'initial' : '100%', flex: $vuetify.breakpoint.mdAndUp ? '1' : 'initial' }"
  >
    <v-slide-x-reverse-transition>
      <form @submit.prevent="search" v-show="value" :style="{ width: $vuetify.breakpoint.mdAndUp ? '380px' : '100%' }">
        <v-text-field
          :label="$t('search') + '...'"
          v-model="seachBarVal"
          solo
          flat
          background-color="rgba(0,0,0,.1)"
          hide-details
          append-icon="mdi-magnify"
          @click:append="search"
        />
      </form>
    </v-slide-x-reverse-transition>
    <v-btn
      icon
      @click="
        value = !value
        $emit('input', value)
        seachBarVal = ''
      "
    >
      <v-icon
        class="anicons"
        :style="{
          'font-variation-settings': value ? `'TIME' 100` : ``
        }"
        >7</v-icon
      >
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'poka-searchbar',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    seachBarVal: null
  }),
  methods: {
    search() {
      this.$router.push('/search?keyword=' + encodeURIComponent(this.seachBarVal))
    }
  }
}
</script>

<style>
</style>