import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'app',
    component: () => import('../App.vue'),
    children: [
      {
        path: '/',
        name: 'default-layout',
        component: () => import('../layouts/default.vue'),
        children: [
          {
            path: '/',
            name: 'Library',
            component: () => import('../pages/Library.vue')
          },
          {
            path: '/albums',
            name: 'Albums',
            component: () => import('../pages/Albums.vue'),
            meta: {
              type: 'albums'
            }
          },
          {
            path: '/album/:source/:id',
            name: 'Album',
            component: () => import('../pages/Album.vue'),
            meta: {
              type: 'album'
            }
          },
          {
            path: '/artists',
            name: 'Artists',
            component: () => import('../pages/Artists.vue'),
            meta: {
              type: 'artists'
            }
          },
          {
            path: '/artist/:source/:id',
            name: 'Artist',
            component: () => import('../pages/Albums.vue'),
            meta: {
              type: 'artists'
            }
          },
          {
            path: '/composers',
            name: 'Composers',
            component: () => import('../pages/Artists.vue'),
            meta: {
              type: 'composers'
            }
          },
          {
            path: '/composer/:source/:id',
            name: 'Composer',
            component: () => import('../pages/Albums.vue'),
            meta: {
              type: 'composers'
            }
          },
          {
            path: '/folders',
            name: 'Folders',
            component: () => import('../pages/Folders.vue')
          },
          {
            path: '/folder/:source/:id',
            name: 'Folder',
            component: () => import('../pages/Folders.vue'),
          },
          {
            path: '/playlists',
            name: 'Playlists',
            component: () => import('../pages/Playlists.vue')
          },
          {
            path: '/playlists/folder/:id',
            name: 'PlaylistsFolder',
            component: () => import('../pages/Playlists.vue')
          },
          {
            path: '/playlist/:source/:id',
            name: 'Playlist',
            component: () => import('../pages/Album.vue'),
            meta: {
              type: 'playlist'
            }
          },
          {
            path: '/search',
            name: 'Search',
            component: () => import('../pages/Search.vue')
          },
          {
            path: '/settings',
            name: 'Settings',
            component: () => import('../pages/settings/Index.vue')
          },
          {
            path: '/settings/theme',
            name: 'SettingsTheme',
            component: () => import('../pages/settings/Theme.vue')
          },
          {
            path: '/settings/quality',
            name: 'SettingsQuality',
            component: () => import('../pages/settings/Quality.vue')
          },
          {
            path: '/settings/pins',
            name: 'SettingsPins',
            component: () => import('../pages/settings/Pins.vue')
          },
          {
            path: '/settings/user',
            name: 'SettingsUser',
            component: () => import('../pages/settings/User.vue')
          },
          {
            path: '/settings/users',
            name: 'SettingsUsers',
            component: () => import('../pages/settings/Users.vue')
          },
          {
            path: '/settings/log',
            name: 'SettingsLog',
            component: () => import('../pages/settings/Log.vue')
          },
          {
            path: '/settings/System',
            name: 'SettingsSystem',
            component: () => import('../pages/settings/System.vue')
          },
          // 404
          {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('../pages/404.vue')
          }
        ]
      },
      {
        path: '/empty',
        name: 'empty-layout',
        component: () => import('../layouts/empty.vue'),
        children: [
          {
            path: '/login',
            name: 'Login',
            component: () => import('../pages/Login.vue')
          },
        ]
      }
    ]
  }]
})

export default router
