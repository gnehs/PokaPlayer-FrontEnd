<template>
  <div class="library-menu">
    <router-link class="item" v-for="(item,i) of items" :key="i" :to="item.to">
      <v-avatar size="48px" item>
        <v-icon class="material-icons-outlined" v-text="item.icon" />
      </v-avatar>
      <div class="text">{{ item.text }}</div>
    </router-link>
  </div>
</template>
<style lang="sass" scoped>
.library-menu
    display: grid
    grid-template-columns: repeat(4,1fr)
    position: relative
    gap: 8px
    --item-bg: 255,255,255
    justify-content: center
    flex-wrap: wrap
    margin: 8px 0
    .item
        text-align: center
        text-decoration: none
        padding: 8px
        border-radius: 16px
        display: flex
        align-items: center
        background-color: rgba(var(--item-bg),.75)
        backdrop-filter: blur(10px)
        box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.1)
        color: #000
        .v-icon
            color: var(--v-primary-base)
        .text
            font-size: 18px
            margin-left: 16px
            font-weight: bold
        .v-avatar
            position: relative
            &:before
                background-color: var(--v-primary-base)
                bottom: 0
                content: ""
                left: 0
                opacity: 0.1
                pointer-events: none
                position: absolute
                right: 0
                top: 0
                border-radius: 4px
                transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
                box-shadow: 0px 4px 14px 0px rgb(0 0 0 / 100%)
        &.router-link-active
            background-color: var(--v-primary-base)
            color: #fff
            .v-avatar
                position: relative
                &:before
                    background-color: #fff
            .v-icon
                color: #fff
        &:hover:not(.router-link-active)
            background-color: rgba(var(--item-bg),1)
            .v-avatar:before
                opacity: .2
@media (prefers-color-scheme: dark)
@media screen and (max-width: 768px)
    .library-menu
        grid-template-columns: repeat(2,1fr)
@media screen and (min-width: 1366px)
    .library-menu
        grid-template-columns: repeat(6,1fr)
</style>
<script>
export default {
  name: "library-menu",
  data: () => ({
    items: [
      { icon: "search", text: i18n.t("search"), to: "/search" },
      { icon: "album", text: i18n.t("album"), to: "/album" },
      { icon: "folder", text: i18n.t("folder"), to: "/folder" },
      { icon: "keyboard_voice", text: i18n.t("artist"), to: "/artist" },
      { icon: "edit", text: i18n.t("composer"), to: "/composer" },
      { icon: "video_library", text: i18n.t("playlist"), to: "/playlist" }
    ]
  }),
  created() {}
};
</script>