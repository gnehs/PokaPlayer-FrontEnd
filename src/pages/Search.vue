<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
const PokaAPI = inject('PokaAPI')
const $route = useRoute();
const keyword = ref('');
const searchResult = ref(null);
const loading = ref(false);
onMounted(async () => {
  await getData()
});
watch(() => $route.path, async () => {
  await getData()
})
async function search() {
  if (keyword.value != '') {
    loading.value = true
    searchResult.value = null
    searchResult.value = await PokaAPI.search(keyword.value)
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="search__input">
      <p-input v-model="keyword"
        @keyup.enter="search" />
      <p-btn @click="search">
        <i class="bx bx-search"></i>
      </p-btn>
    </div>
    <Loader v-if="loading" />
    <template v-if="searchResult">
      <div class="search__result" v-if="searchResult.songs?.length">
        <h3>{{ $t(`nav.songs`) }}</h3>
        <parse-songs :items="searchResult.songs" />
      </div>
      <div class="search__result" v-if="searchResult.albums?.length">
        <h3>{{ $t(`nav.albums`) }}</h3>
        <parse-albums :items="searchResult.albums" />
      </div>
      <div class="search__result" v-if="searchResult.artists?.length">
        <h3>{{ $t(`nav.artists`) }}</h3>
        <parse-artists type="artists" :items="searchResult.artists" />
      </div>
      <div class="search__result" v-if="searchResult.composers?.length">
        <h3>{{ $t(`nav.composers`) }}</h3>
        <parse-artists type="composers" :items="searchResult.composers" />
      </div>
      <div class="search__result" v-if="searchResult.playlists?.length">
        <h3>{{ $t(`nav.playlists`) }}</h3>
        <parse-playlists :items="searchResult.playlists" />
      </div>
    </template>
  </div>
</template>
<style lang="sass" scoped>
.search__input
  display: flex
  gap: var(--padding)
  max-width: 500px
  margin: 0 auto
  .p-input
    flex: 1
.search__result
  margin: calc(var(--padding) * 6) 0
  h3
    margin-bottom:  var(--padding)
</style>