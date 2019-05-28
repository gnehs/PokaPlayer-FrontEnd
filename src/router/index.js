import Vue from 'vue'
import Router from 'vue-router'

import Album from '@/pages/Album'
import AlbumSongs from '@/pages/AlbumSongs'
import Artist from '@/pages/Artist'
import ArtistAlbum from '@/pages/ArtistAlbum'
import Composer from '@/pages/Composer'
import ComposerAlbum from '@/pages/ComposerAlbum'
import Folder from '@/pages/Folder'
import Home from '@/pages/Home'
import Install from '@/pages/Install'
import Login from '@/pages/Login'
import NowPlaying from '@/pages/NowPlaying'
import Notfound from '@/pages/Notfound'
import Playlist from '@/pages/Playlist'
import PlaylistSongs from '@/pages/PlaylistSongs'
import Lyric from '@/pages/Lyric'
import Search from '@/pages/Search'
import Setting from '@/pages/Setting'
import SettingNetwork from '@/pages/SettingNetwork'
import SettingCustomize from '@/pages/SettingCustomize'
import SettingLang from '@/pages/SettingLang'
import SettingSystem from '@/pages/SettingSystem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/lyric',
    name: 'Lyric',
    component: Lyric
  }, {
    path: '/album/songs/:source/:id',
    name: 'AlbumSongs',
    component: AlbumSongs,
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/album',
    name: 'Album',
    component: Album
  }, {
    path: '/artist/:source/:id',
    name: 'ArtistAlbum',
    component: ArtistAlbum,
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/artist',
    name: 'Artist',
    component: Artist
  }, {
    path: '/composer/:source/:id',
    name: 'ComposerAlbum',
    component: ComposerAlbum,
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/composer',
    name: 'Composer',
    component: Composer
  }, {
    path: '/folder/:source/:id',
    name: 'folderFiles',
    component: Folder,
    meta: {
      transitionName: 'slide',
      root: false
    }
  }, {
    path: '/folder',
    name: 'Folder',
    component: Folder,
    meta: {
      root: true
    }
  }, {
    path: '/install',
    name: 'Install',
    component: Install
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/now',
    name: 'NowPlaying',
    component: NowPlaying
  }, {
    path: '/playlist/:source/:id',
    component: PlaylistSongs,
    name: 'PlaylistSongs',
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist
  }, {
    path: '/search',
    name: 'Search',
    component: Search
  }, {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }, {
    path: '/setting/network',
    name: 'SettingNetwork',
    component: SettingNetwork,
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/setting/customize',
    name: 'SettingCustomize',
    component: SettingCustomize,
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/setting/lang',
    name: 'SettingLang',
    component: SettingLang,
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/setting/system',
    name: 'SettingSystem',
    component: SettingSystem,
    meta: {
      transitionName: 'slide'
    }
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/notfound',
    name: 'Notfound',
    component: Notfound
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '*',
    redirect: '/notfound'
  }]
})