import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NowPlaying from '@/components/NowPlaying'
import Install from '@/components/Install'
import Notfound from '@/components/Notfound'
import Login from '@/components/Login'
import Album from '@/components/Album'
import Artist from '@/components/Artist'
import Composer from '@/components/Composer'
import Folder from '@/components/Folder'
import Playlist from '@/components/Playlist'
import Search from '@/components/Search'
import Setting from '@/components/Setting'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/now',
    name: 'NowPlaying',
    component: NowPlaying
  }, {
    path: '/album',
    name: 'Album',
    component: Album
  }, {
    path: '/artist',
    name: 'Artist',
    component: Artist
  }, {
    path: '/composer',
    name: 'Composer',
    component: Composer
  }, {
    path: '/folder',
    name: 'Folder',
    component: Folder
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
    path: '/install',
    name: 'Install',
    component: Install
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '*',
    name: 'Notfound',
    component: Notfound
  }]
})