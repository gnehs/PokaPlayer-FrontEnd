import Vue from 'vue'
import Router from 'vue-router'

import defaultLayout from '@/layout/default'
import emptyLayout from '@/layout/empty'
import settingLayout from '@/layout/setting'

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
import LyricEdit from '@/pages/LyricEdit'
import Search from '@/pages/Search'
import Setting from '@/pages/setting/index'
import SettingNetwork from '@/pages/setting/network'
import SettingInterface from '@/pages/setting/interface'
import SettingSystem from '@/pages/setting/system'
import SettingUser from '@/pages/setting/user'
import SettingPrivacy from '@/pages/setting/privacy'

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
			meta: {
				transitionName: 'slide'
			}
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
			path: '/now',
			name: 'NowPlaying',
			component: NowPlaying
		}, {
			path: '/playlist/f/*',
			name: 'PlaylistFolder',
			component: Playlist,
			meta: {
				transitionName: 'slide'
			}
		}, {
			path: '/playlist/p/:source/:id',
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
			path: '/home',
			name: 'Home',
			component: Home
		}, {
			path: '/notfound',
			name: 'Notfound',
			component: Notfound
		}, {
			path: '',
			redirect: '/home'
		}]
	}, {
		path: '/',
		name: 'empty',
		component: emptyLayout,
		children: [{
			path: '/install',
			name: 'Install',
			component: Install
		}, {
			path: '/login',
			name: 'Login',
			component: Login
		}]
	}, {
		path: '/',
		name: 'setting',
		component: settingLayout,
		children: [{
			path: '/setting',
			name: 'Setting',
			component: Setting
		}, {
			path: '/settings/interface',
			name: 'SettingInterface',
			component: SettingInterface,
			meta: {
				transitionName: 'slide'
			}
		}, {
			path: '/settings/network',
			name: 'SettingNetwork',
			component: SettingNetwork,
			meta: {
				transitionName: 'slide'
			}
		}, {
			path: '/settings/system',
			name: 'SettingSystem',
			component: SettingSystem,
			meta: {
				transitionName: 'slide'
			}
		}, {
			path: '/settings/user',
			name: 'SettingUser',
			component: SettingUser,
			meta: {
				transitionName: 'slide'
			}
		}, {
			path: '/settings/privacy',
			name: 'SettingPrivacy',
			component: SettingPrivacy,
			meta: {
				transitionName: 'slide'
			}
		}]
	}, {
		path: '*',
		redirect: '/notfound'
	}]
})