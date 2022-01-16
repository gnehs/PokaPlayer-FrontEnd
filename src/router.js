import Vue from "vue";
import Router from "vue-router";

import defaultLayout from "@/layout/default";
import emptyLayout from "@/layout/empty";

import Albums from "@/pages/Albums";
import AlbumSongs from "@/pages/AlbumSongs";
import Artist from "@/pages/Artist";
import Composer from "@/pages/Composer";
import Empty from "@/pages/Empty";
import Folder from "@/pages/Folder";
import Login from "@/pages/Login";
import Notfound from "@/pages/Notfound";
import Playlist from "@/pages/Playlist";
import PlaylistSongs from "@/pages/PlaylistSongs";
import Shuffle from "@/pages/shuffle";
import Library from "@/pages/Library";
import LyricEdit from "@/pages/LyricEdit";
import Search from "@/pages/Search";
import Install from "@/pages/install/Install";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: defaultLayout,
      redirect: "/library",
      children: [
        {
          path: "/library",
          name: "Library",
          component: Library,
          meta: {
            fullscreen: false
          }
        },
        {
          path: "/fullscreen",
          name: "fullscreen",
          component: Empty,
          meta: {
            fullscreen: true
          }
        },
        {
          path: "/lyric/edit",
          name: "LyricEdit",
          component: LyricEdit
        },
        {
          path: "/album/songs/:source/:id",
          name: "AlbumSongs",
          component: AlbumSongs
        },
        {
          path: "/album",
          name: "Album",
          component: Albums,
          meta: {
            type: "album"
          }
        },
        {
          path: "/artist/:source/:id",
          name: "ArtistAlbum",
          component: Albums,
          meta: {
            type: "artist"
          }
        },
        {
          path: "/artist",
          name: "Artist",
          component: Artist
        },
        {
          path: "/composer/:source/:id",
          name: "ComposerAlbum",
          component: Albums,
          meta: {
            type: "composer"
          }
        },
        {
          path: "/composer",
          name: "Composer",
          component: Composer
        },
        {
          path: "/folder/:source/:id",
          name: "folderFiles",
          component: Folder,
          meta: {
            root: false
          }
        },
        {
          path: "/folder",
          name: "Folder",
          component: Folder,
          meta: {
            root: true
          }
        },
        {
          path: "/playlist/f/*",
          name: "PlaylistFolder",
          component: Playlist
        },
        {
          path: "/playlist/p/:source/:id",
          component: PlaylistSongs,
          name: "PlaylistSongs"
        },
        {
          path: "/playlist",
          name: "Playlist",
          component: Playlist
        },
        {
          path: "/search",
          name: "Search",
          component: Search
        },
        {
          path: "/shuffle",
          name: "Shuffle",
          component: Shuffle
        },
        {
          path: "/notfound",
          name: "Notfound",
          component: Notfound
        },
        {
          path: "/debug",
          name: "Debug",
          component: () => import("@/pages/Debug")
        },
        {
          path: "/review",
          name: "Review",
          component: () => import("@/pages/Review")
        },
        {
          path: "",
          redirect: "/library"
        },
        {
          path: "/settings",
          name: "setting",
          redirect: "/settings/network",
          component: () =>
            import(/* webpackChunkName: "setting" */ "@/layout/setting"),
          children: [
            {
              path: "/settings/interface",
              name: "SettingInterface",
              component: () =>
                import(
                  /* webpackChunkName: "setting" */ "@/pages/setting/interface"
                )
            },
            {
              path: "/settings/network",
              name: "SettingNetwork",
              component: () =>
                import(
                  /* webpackChunkName: "setting" */ "@/pages/setting/network"
                )
            },
            {
              path: "/settings/user",
              name: "SettingUser",
              component: () =>
                import(/* webpackChunkName: "setting" */ "@/pages/setting/user")
            },
            {
              path: "/settings/pins",
              name: "SettingPins",
              component: () =>
                import(/* webpackChunkName: "setting" */ "@/pages/setting/pins")
            },
            {
              path: "/settings/about",
              name: "SettingAbout",
              component: () =>
                import(/* webpackChunkName: "setting" */ "@/pages/setting/about")
            }
          ]
        },
        {
          path: "/admin",
          name: "settingAdmin",
          redirect: "/admin/system",
          component: () =>
            import(
              /* webpackChunkName: "setting-admin" */ "@/layout/settingAdmin"
            ),
          children: [
            {
              path: "/admin/system",
              name: "SettingSystem",
              component: () =>
                import(
                  /* webpackChunkName: "setting-admin" */ "@/pages/admin/system"
                )
            },
            {
              path: "/admin/users",
              name: "SettingAdminUsers",
              component: () =>
                import(
                  /* webpackChunkName: "setting-admin" */ "@/pages/admin/users"
                )
            },
            {
              path: "/admin/config",
              name: "SettingAdminConfig",
              component: () =>
                import(
                  /* webpackChunkName: "setting-admin" */ "@/pages/admin/config"
                )
            },
            {
              path: "/admin/log",
              name: "AdminLog",
              component: () =>
                import(
                  /* webpackChunkName: "setting-admin" */ "@/pages/admin/log"
                )
            }
          ]
        }
      ]
    },
    {
      path: "/",
      name: "empty",
      component: emptyLayout,
      children: [
        {
          path: "/login",
          name: "Login",
          component: Login
        },
        {
          path: "/install",
          name: "install",
          component: Install
        },
      ]
    },
    {
      path: "*",
      redirect: "/notfound"
    }
  ]
});
