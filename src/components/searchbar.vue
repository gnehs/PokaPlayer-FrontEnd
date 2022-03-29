<template>
  <div style="display: flex; justify-content: flex-end">
    <v-slide-x-reverse-transition>
      <form
        @submit.prevent="search"
        v-show="value"
        :style="{ width: $vuetify.breakpoint.mdAndUp ? '380px' : '100%' }"
      >
        <v-text-field
          :placeholder="$t('search') + '…'"
          v-model="seachBarVal"
          autofocus
          solo
          flat
          background-color="rgba(0,0,0,.1)"
          hide-details
          append-icon="mdi-magnify"
          @click:append="search"
        />
      </form>
    </v-slide-x-reverse-transition>
    <v-btn icon @click="toggleSearchbar">
      <v-icon
        class="anicons"
        :style="{
          'font-variation-settings': value ? `'TIME' 100` : ``
        }"
      >7</v-icon>
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
      if (this.seachBarVal != '') {
        this.$router.push('/search?keyword=' + encodeURIComponent(this.seachBarVal))
      }
    },
    toggleSearchbar() {
      this.value = !this.value;
      this.$emit('input', this.value);
      this.seachBarVal = '';
    }
  }
}
</script>

<style>
</style>