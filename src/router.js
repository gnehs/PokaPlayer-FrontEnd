import Vue from 'vue'
import Router from 'vue-router'

import defaultLayout from '@/layout/default'
import emptyLayout from '@/layout/empty'
import settingLayout from '@/layout/setting'
import adminLayout from '@/layout/settingAdmin'

import Albums from '@/pages/Albums'
import AlbumSongs from '@/pages/AlbumSongs'
import Artist from '@/pages/Artist'
import Composer from '@/pages/Composer'
import Debug from '@/pages/Debug'
import Folder from '@/pages/Folder'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NowPlaying from '@/pages/NowPlaying'
import Notfound from '@/pages/Notfound'
import Playlist from '@/pages/Playlist'
import PlaylistSongs from '@/pages/PlaylistSongs'
import Shuffle from '@/pages/shuffle'
import Lyric from '@/pages/Lyric'
import LyricEdit from '@/pages/LyricEdit'
import Search from '@/pages/Search'
import SettingNetwork from '@/pages/setting/network'
import SettingInterface from '@/pages/setting/interface'
import SettingUser from '@/pages/setting/user'
import SettingPins from '@/pages/setting/pins'

import AdminUsers from '@/pages/admin/users'
import AdminSystem from '@/pages/admin/system'
import AdminLog from '@/pages/admin/log'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'root',
		component: defaultLayout,
		redirect: '/home',
		children: [{
			path: '/lyric',
			name: 'Lyric',
			component: Lyric
		}, {
			path: '/lyric/edit',
			name: 'LyricEdit',
			component: LyricEdit,
		}, {
			path: '/album/songs/:source/:id',
			name: 'AlbumSongs',
			component: AlbumSongs,
		}, {
			path: '/album',
			name: 'Album',
			component: Albums,
			meta: {
				type: "album"
			}
		}, {
			path: '/artist/:source/:id',
			name: 'ArtistAlbum',
			component: Albums,
			meta: {
				type: "artist"
			}
		}, {
			path: '/artist',
			name: 'Artist',
			component: Artist
		}, {
			path: '/composer/:source/:id',
			name: 'ComposerAlbum',
			component: Albums,
			meta: {
				type: "composer"
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
			path: '/now',
			name: 'NowPlaying',
			component: NowPlaying
		}, {
			path: '/playlist/f/*',
			name: 'PlaylistFolder',
			component: Playlist,
		}, {
			path: '/playlist/p/:source/:id',
			component: PlaylistSongs,
			name: 'PlaylistSongs',
		}, {
			path: '/playlist',
			name: 'Playlist',
			component: Playlist
		}, {
			path: '/search',
			name: 'Search',
			component: Search
		}, {
			path: '/home',
			name: 'Home',
			component: Home
		}, {
			path: '/shuffle',
			name: 'Shuffle',
			component: Shuffle
		}, {
			path: '/notfound',
			name: 'Notfound',
			component: Notfound
		}, {
			path: '/debug',
			name: 'Debug',
			component: Debug
		}, {
			path: '',
			redirect: '/home'
		},
		{
			path: '/settings',
			name: 'setting',
			redirect: '/settings/network',
			component: settingLayout,
			children: [{
				path: '/settings/interface',
				name: 'SettingInterface',
				component: SettingInterface
			}, {
				path: '/settings/network',
				name: 'SettingNetwork',
				component: SettingNetwork
			}, {
				path: '/settings/user',
				name: 'SettingUser',
				component: SettingUser
			}, {
				path: '/settings/pins',
				name: 'SettingPins',
				component: SettingPins
			}]
		}, {
			path: '/admin',
			name: 'settingAdmin',
			redirect: '/admin/users',
			component: adminLayout,
			children: [{
				path: '/admin/system',
				name: 'SettingSystem',
				component: AdminSystem
			}, {
				path: '/admin/users',
				name: 'SettingAdminUsers',
				component: AdminUsers
			}, {
				path: '/admin/log',
				name: 'AdminLog',
				component: AdminLog
			}]
		},]
	}, {
		path: '/',
		name: 'empty',
		component: emptyLayout,
		children: [{
			path: '/login',
			name: 'Login',
			component: Login
		}]
	}, {
		path: '*',
		redirect: '/notfound'
	}]
})