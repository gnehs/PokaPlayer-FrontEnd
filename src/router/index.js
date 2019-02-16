import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NowPlaying from '@/components/NowPlaying'
import Install from '@/components/Install'
import Notfound from '@/components/Notfound'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/now',
    name: 'NowPlaying',
    component: NowPlaying
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