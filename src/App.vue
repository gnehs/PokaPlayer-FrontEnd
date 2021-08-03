<template>
  <v-app class="page-container">
    <router-view />
    <v-snackbar v-model="snackbar.show" :class="{ withBottomPlayer: snackbar.withBottomPlayer }">{{ snackbar.message }}</v-snackbar>
  </v-app>
</template>
<script>
import Vue from 'vue'
export default {
  created() {
    Vue.prototype.$deepCopy = window._deepcopy
    Vue.prototype.$randomPlay = window._randomPlay
    Vue.prototype.$addSongs = window._addSongs
    //註冊點心條組件
    Vue.prototype.$snackbar = (msg = ``, duration = 1500) => {
      this.snackbar.message = msg
      this.snackbar.withBottomPlayer = document.querySelectorAll('.bottom-player').length && this.$route.path != '/fullscreen'
      this.snackbar.show = true
      clearTimeout(this.snackbar.timeout)
      this.snackbar.timeout = setTimeout(() => (this.snackbar.show = false), duration)
    }
    Vue.prototype.$pagination = (items, page, itemPerPage = 40) => {
      page -= 1
      return items.slice(page * itemPerPage, page * itemPerPage + itemPerPage)
    }
    Vue.prototype.$getPages = (items, itemPerPage = 40) => {
      return Math.ceil(items.length / itemPerPage)
    }
    // set theme color
    this.$vuetify.theme.themes.dark.primary = window._setting('theme')
    this.$vuetify.theme.themes.light.primary = window._setting('theme')
    // update theme-color
    this.$nextTick(() => {
      let root = document.documentElement
      root.setAttribute('color-scheme', _setting('color-scheme'))
      console.log(getComputedStyle(root).getPropertyValue('--surface2'))
      this.$vuetify.theme.themes.dark.primary = getComputedStyle(root).getPropertyValue('--surface2')
      document.getElementsByTagName('meta')['theme-color'].content = this.$vuetify.theme.isDark
        ? getComputedStyle(root)
            .getPropertyValue('--surface2')
            .trim()
        : 'rgb(245, 245, 245)'
    })
  },
  data: () => ({
    snackbar: {
      show: false,
      message: ``,
      timeout: null,
      withBottomPlayer: true
    }
  })
}
</script>
<style lang="sass">
@import "@/assets/pokaList.sass"
@import "@/assets/main.sass"
</style>
<style lang="scss">
  .page-container {
    overflow: hidden;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    &.theme--dark {
      background: var(--surface1) !important;
    }
  }
  .theme--dark.v-sheet,
  .theme--dark.v-navigation-drawer,
  .theme--dark.v-tabs-items,
  .theme--dark.v-stepper {
    border-color: var(--surface2);
    background: var(--surface2) !important;
  }
  .v-application.v-application {
    font-family: var(--default-font);
  }
  .v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: 8px !important;
  }
  .v-card + .v-card {
    margin-top: 16px;
  }
  .t-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-snack--bottom.withBottomPlayer {
    padding-bottom: 77px !important;
  }
  .v-snack__wrapper {
    background-color: rgba(57, 53, 77, 0.8) !important;
    backdrop-filter: blur(3px) !important;
  }
  nav .theme--dark.v-list-item--active:hover::before,
  nav .theme--dark.v-list-item--active::before {
    opacity: 0.2;
    background-color: #776ea0;
  }
  nav .theme--dark.v-list-item--active,
  nav .theme--dark.v-list-item--active {
    color: #fff !important;
  }
  .material-icons-outlined.material-icons-outlined.material-icons-outlined {
    font-family: 'Material Icons Outlined' !important;
  }
  #playlist-dialog {
    .theme--dark.v-list-item--active:hover::before,
    .theme--dark.v-list-item--active::before {
      opacity: 0 !important;
    }
    .theme--dark.v-list-item,
    .v-list-item--link:before {
      border-radius: 8px !important;
    }
  }
</style>
<style lang="sass">
// icon
.v-icon
  font-style: normal !important
//---------------------//
//       v-card        //
//---------------------//
.v-card.blur-card
  background-color: rgba(255, 255, 255, .75) !important
  backdrop-filter: blur(20px)
  box-shadow: 0px 4px 14px 0px rgb(0 0 0 / 10%) !important
  border: 0.25px solid rgba(255, 255, 255, 0.05)
  &.theme--dark
    background: rgb(47 43 62 / .7) !important
.theme--light,
.theme--dark
  &.v-tabs-items
    background-color: transparent !important
//---------------------//
//       dial0g        //
//---------------------//
.v-dialog__content.v-dialog__content--active
  background-color: rgb(0 0 0 / 40%)
  backdrop-filter: blur(10px)
.v-dialog.v-dialog--fullscreen > .v-card > .v-card__text
  padding: 0 2px 20px !important
// tooltip
.v-tooltip__content
  background-color: rgb(255, 255, 255) !important
  color: #000 !important
  box-shadow: 0px 4px 14px 0px rgba(0 0 0 / 10%) !important
// nav
.v-navigation-drawer
  &.v-navigation-drawer--mini-variant
    width: 64px !important
  .v-list--nav
    .v-list-item
      padding: 0 12px
      border-radius: 8px !important
      &::before
        border-radius: 8px !important
      .v-list-item__icon
        height: 24px
        margin-top: 12px
        margin-bottom: 12px
      .v-list-item__content
        padding: 16px 0
    .v-list-item--active
      color: #000 !important
      background: #fff !important
      box-shadow: 0px 4px 14px 0px rgba(0 0 0 / 10%) !important
      .v-list-item__content
        color: #000 !important
        z-index: 1
      &::before
        opacity: 0 !important
        background-color: #fff

.dialog-title
  font-size: 24px !important
  padding: 24px
  padding-bottom: 8px
  padding-top: 64px
  background-color: rgba(0,0,0,.05)
</style>
