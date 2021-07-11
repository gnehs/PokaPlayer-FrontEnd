<template>
  <div class="chip-nav">
    <router-link
      class="chip-nav-item"
      :class="{ active: $route.path == item.to }"
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      v-ripple
    >
      <v-icon class="material-icons-outlined">{{ item.icon }}</v-icon>
      <span>{{ $t(item.text) }}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'library-menu',
  data: () => ({
    items: [
      { icon: 'library_music', text: 'library', to: '/library' },
      //{ icon: 'search', text: 'search', to: '/search' },
      { icon: 'album', text: 'album', to: '/album' },
      { icon: 'folder', text: 'folder', to: '/folder' },
      { icon: 'keyboard_voice', text: 'artist', to: '/artist' },
      { icon: 'edit', text: 'composer', to: '/composer' },
      { icon: 'video_library', text: 'playlist', to: '/playlist' }
    ]
  }),
  created() {}
}
</script>
