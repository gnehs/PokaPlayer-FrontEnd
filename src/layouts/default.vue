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
        <router-link class="header-action-item" v-for="item in actions" :to="item.to">

          <i class='nav-item-icon bx' :class="item.icon"></i>
        </router-link>
      </div>
    </div>
    <div class="nav">
      <router-link class="nav-item" v-for="item in nav" :to="item.to">
        <i class='nav-item-icon bx' :class="item.icon"></i>
        <div class="nav-item-text">{{ item.text }}</div>
      </router-link>
    </div>
    <div class="main">
      <RouterView />
    </div>
    <div class="player">
      <bottom-player />
    </div>
  </div>
  <LoginDialog v-model="loginDialog" />
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      loginDialog: true,
      actions: [
        {
          icon: 'bx-cog',
          to: '/settings'
        }
      ],
      nav: [
        { icon: 'bx-library', text: 'library', to: '/' },
        { icon: 'bx-search', text: 'search', to: '/search' },
        { icon: 'bx-album', text: 'albums', to: '/albums' },
        { icon: 'bx-folder', text: 'folders', to: '/folders' },
        { icon: 'bx-microphone', text: 'artists', to: '/artists' },
        { icon: 'bx-pencil', text: 'composers', to: '/composers' },
        { icon: 'bxs-playlist', text: 'playlists', to: '/playlists' }
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
  grid-template-columns: calc(var(--padding) * 6 + 24px) 1fr
  grid-template-rows: auto 1fr
  grid-template-areas: "header header" "nav main" "player player"
  @media (max-width: 768px)
    grid-template-columns: calc(var(--padding) * 5 + 24px) 1fr
  .header
    grid-area: header
    display: grid
    grid-template-columns: 200px 1fr 200px
    @media (max-width: 768px)
      grid-template-columns: auto 1fr
    .logo
      padding: var(--border-radius)
      font-family: 'Product Sans'
      font-size: 24px
    .search-bar
      display: flex
      align-items: center
      justify-content: center
      @media (max-width: 768px)
        display: none
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
      .header-action-item
        padding: var(--padding)
        display: flex
        align-items: center
        justify-content: center
        text-decoration: none
        border-radius: var(--border-radius)
        &:hover
          background-color: rgba(var(--text-color-value),0.05)
        &:active
          background-color: rgba(var(--text-color-value),0.1)

        i
          font-size: 24px
          color: var(--text-color)
  .nav
    grid-area: nav
    padding: 0 var(--padding)
    .nav-item
      padding: calc(var(--padding) * 2)
      display: block
      border-radius: var(--border-radius)
      color: var(--text-color)
      text-decoration: none
      display: flex
      align-items: center

      position: relative

      &:not(:first-child)
        margin-top: calc(var(--padding) / 2)
      .nav-item-icon
        margin-right: calc(var(--padding) * 2)
        font-size: 24px
      .nav-item-text
        opacity: 0
        position: absolute
        left: calc(var(--padding) * 8)
        transition: all var(--transition)
        transform: scale(0.75) translateX(calc(var(--padding) * -5))
        filter: blur(2px)
        background-color: var(--background-layer-1)
        border: var(--border-width) solid var(--border-color)
        padding: var(--padding) calc(var(--padding) * 2)
        box-shadow: var(--box-shadow)
        border-radius: var(--border-radius)
        pointer-events: none
      &:hover
        background-color: rgba(var(--text-color-value),0.05)
        .nav-item-text
          opacity: 1
          filter: blur(0)
          transform: none
      @media (max-width: 768px)
        padding: calc(var(--padding) * 1.5)
        .nav-item-text
          left: calc(var(--padding) * 7)
        .nav-item-icon
          margin-right: 0
      &.router-link-exact-active
        background-color: rgba(var(--text-color-value),0.1)
  .main
    grid-area: main
    background-color: var(--background-layer-1)
    border-top-left-radius: var(--border-radius)
    border-bottom-left-radius: var(--border-radius)
    padding: calc(var(--padding) * 4)
    overflow-y: scroll
    @media (max-width: 768px)
      padding: calc(var(--padding) * 2)
  .player
    grid-area: player
    background-color: var(--background-layer-2)
    //padding: calc(var(--padding) * 2)
</style>