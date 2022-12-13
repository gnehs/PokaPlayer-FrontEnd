

<template>
  <div class="default-layout-container">
    <div class="header">
      <div class="logo">
        PokaPlayer
      </div>
      <div class="header-center" id="header-center">
      </div>
      <div class="header-actions" id="header-actions">
        <router-link class="nav-item" v-for="item in actions" :to="item.to">
          <i class='nav-item-icon bx' :class="item.icon"></i>
          <div class="nav-item-text">{{ $t(`nav.${item.text}`) }}</div>
        </router-link>
      </div>
    </div>
    <div class="nav">
      <router-link class="nav-item" v-for="item in nav" :to="item.to">
        <i class='nav-item-icon bx' :class="item.icon"></i>
        <div class="nav-item-text">{{ $t(`nav.${item.text}`) }}</div>
      </router-link>
    </div>
    <div class="main">
      <Loader v-if="starting" />
      <RouterView v-else />
    </div>
    <div class="player">
      <bottom-player />
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { RouterView, RouterLink } from 'vue-router'
export default {
  name: 'DefaultLayout',
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  components: {
    RouterView,
    RouterLink
  },
  data() {
    return {
      starting: true,
      actions: [
        { icon: 'bx-cog', text: 'settings', to: '/settings', }
      ],
      nav: [
        { icon: 'bx-library', text: 'library', to: '/' },
        { icon: 'bx-search', text: 'search', to: '/search' },
        { icon: 'bx-album', text: 'albums', to: '/albums' },
        { icon: 'bx-folder', text: 'folders', to: '/folders' },
        { icon: 'bx-microphone', text: 'artists', to: '/artists' },
        { icon: 'bxs-piano', text: 'composers', to: '/composers' },
        { icon: 'bxs-playlist', text: 'playlists', to: '/playlists' }
      ]
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    async start() {
      try {
        let userInfo = await this.$PokaAPI.getUserInfo()
        this.starting = false
        this.userStore.setUserInfo(userInfo)
      } catch (e) {
        console.log(e)
        this.$router.push('/login')
      }
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
    grid-template-columns: calc(var(--padding) * 3.5 + 24px) 1fr
  .header
    grid-area: header
    display: grid
    grid-template-columns: 200px 1fr 200px
    @media (max-width: 768px)
      grid-template-columns: auto 1fr
    .logo
      padding: calc(var(--padding) * 2)
      font-family: 'Product Sans', sans-serif
      font-weight: bold
      font-size: 24px
    .header-center
      display: flex
      align-items: center
      justify-content: center
      font-weight: bold
      font-size: 18px
      text-align: center
      @media (max-width: 768px)
        display: none
    .header-actions
      display: flex
      align-items: center
      justify-content: flex-end
      .nav-item
        .nav-item-text
          left: initial
          top: calc(var(--padding) * 8)
          right: 0
          transform: scale(0.75) translateY(calc(var(--padding) * -5))
        &:hover .nav-item-text
          transform: none
  .nav
    grid-area: nav
    padding: 0 var(--padding)
    @media (max-width: 768px)
      padding: 0 calc(var(--padding) * .25)
  .nav-item
    padding: calc(var(--padding) * 2)
    display: block
    border-radius: var(--border-radius)
    color: var(--text-color)
    text-decoration: none
    display: flex
    align-items: center

    position: relative
    transition: all var(--transition)
    z-index: 1
    &:not(:first-child)
      margin-top: calc(var(--padding) / 2)
    .nav-item-icon
      font-size: 24px
    .nav-item-text
      opacity: 0
      position: absolute
      left: calc(var(--padding) * 7.5)
      transition: all var(--transition)
      transform: scale(0.75) translateX(calc(var(--padding) * -5))
      background-color: var(--background-layer-1)
      border: var(--border-width) solid var(--border-color)
      padding: var(--padding) calc(var(--padding) * 2)
      box-shadow: var(--box-shadow)
      border-radius: var(--border-radius)
      pointer-events: none
      white-space: nowrap
    &:hover
      background-color: rgba(var(--text-color-value),0.075)
      outline: 0
      .nav-item-text
        opacity: 1
        filter: blur(0)
        transform: none
    &:active
      background-color: rgba(var(--text-color-value),0.15)
      transform: scale(.95)

    @media (max-width: 768px)
      padding: calc(var(--padding) * 1.5)
      .nav-item-text
        left: calc(var(--padding) * 7)
      .nav-item-icon
        margin-right: 0
    &.router-link-exact-active
      background-color: rgba(var(--text-color-value),0.15)
      transform: none

      .nav-item-text
        transition-delay: .4s
        opacity: 0
        transform: scale(0.75) translateX(calc(var(--padding) * -5))
  .main
    grid-area: main
    background-color: var(--background-layer-1)
    border-top-left-radius: var(--border-radius)
    border-bottom-left-radius: var(--border-radius)
    padding: calc(var(--padding) * 4)
    overflow-y: scroll
    &::-webkit-scrollbar
      width: 4px
    &::-webkit-scrollbar-track
      background: transparent
    &::-webkit-scrollbar-thumb
      background: #888
      border-radius: 2px
    &::-webkit-scrollbar-thumb:hover
      background: #777
    &::-webkit-scrollbar-thumb:active
      background: #666
    &::-webkit-scrollbar-button
      display: none
    @media (max-width: 768px)
      padding: calc(var(--padding) * 2)
  .player
    grid-area: player
    background-color: var(--background-layer-2)
    //padding: calc(var(--padding) * 2)
</style>