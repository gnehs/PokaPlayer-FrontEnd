<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="default-layout-container">
    <div class="header">
      <div class="logo">
        PokaPlayer
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div class="header-actions">
        <img src="https://i.pravatar.cc/150?img=2" />
      </div>
    </div>
    <div class="nav">
      <router-link class="nav-item" v-for="item in nav" :key="item.name" :to="item.to">
        <i class='nav-item-icon bx' :class="item.icon"></i>
        <div class="nav-item-text">{{ item.text }}</div>
      </router-link>
    </div>
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      nav: [
        { icon: 'bx-library', text: 'library', to: '/' },
        //{ icon: 'search', text: 'search', to: '/search' },
        { icon: 'bx-album', text: 'album', to: '/album' },
        { icon: 'bx-folder', text: 'folder', to: '/folder' },
        { icon: 'bx-microphone', text: 'artist', to: '/artist' },
        { icon: 'bx-pencil', text: 'composer', to: '/composer' },
        { icon: 'bxs-playlist', text: 'playlist', to: '/playlist' }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.default-layout-container
  width: 100svw
  height: 100svh
  background-color: var(--background-layer-2)

  display: grid
  grid-template-columns: 256px 1fr
  grid-template-rows: auto 1fr
  grid-template-areas: "header header" "nav main"
  .header
    grid-area: header
    display: grid
    grid-template-columns: 200px 1fr 200px
    .logo
      padding: var(--border-radius)
      font-family: 'Product Sans'
      font-size: 24px
    .search-bar
      display: flex
      align-items: center
      justify-content: center
      input
        width: 396px
        padding: calc(var(--padding) * 1.5)
        border: var(--border-width) solid var(--border-color)
        border-radius: var(--border-radius)
        background-color: var(--background-layer-1)
        color: var(--text-color)
        &:focus
          outline: none
          border-color: var(--border-focus-color)
    .header-actions
      padding: var(--padding)
      display: flex
      align-items: center
      justify-content: flex-end
      img
        width: 36px
        height: 36px
        border-radius: 50%
  .nav
    grid-area: nav
    padding: 0 var(--padding)
    .nav-item
      padding: var(--border-radius)
      display: block
      border-radius: var(--border-radius)
      color: var(--text-color)
      text-decoration: none
      display: flex
      align-items: center
      opacity: .75
      &:not(:first-child)
        margin-top: calc(var(--padding) / 2)
      .nav-item-icon
        margin-right: 8px
        font-size: 18px
      &:hover
        background-color: var(--background-layer-1)
      &.router-link-exact-active
        background-color: var(--background-layer-1)
        // box-shadow: var(--box-shadow)
        border: var(--border-width) solid var(--border-color)
        opacity: 1
  .main
    grid-area: main
    background-color: var(--background-layer-1)
    border-top-left-radius: var(--border-radius)
    padding: var(--padding)
</style>