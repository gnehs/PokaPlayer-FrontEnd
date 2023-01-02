/**
 * PokaAPI
 * @class PokaAPI
 */
export default class {
  #username = localStorage.getItem('username') || ''
  #password = localStorage.getItem('password') || ''
  constructor() {
  }
  /**
   * Send request
   * @param  {string} url
   * @param  {string} method
   * @param  {object} body
   * @param  {object} params
   * @return {Promise} Promise object represents request result
   * @memberof PokaAPI
   */
  async #fetch({
    url,
    method = 'GET',
    body = {},
    params = {}
  }) {
    return fetch(url, {
      method,
      credentials: "same-origin",
      body: method === 'GET' ? undefined : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
  }
  /**
    * Send Login Request
    * @param  {string} username
    * @param  {string} password
    * @return {Promise} Promise object represents login result
    * @memberof PokaAPI
    */
  async login(username, password) {
    this.#username = username
    this.#password = password
    await this.#fetch({ url: '/pokaapi/v2/user/logout/' })

    let res = await this.#fetch({
      url: '/pokaapi/v2/user/login/',
      method: 'POST',
      body: {
        username: this.#username,
        password: this.#password
      }
    })

    if (res.success) {
      localStorage.setItem('username', this.#username)
      localStorage.setItem('password', this.#password)
    }
    return res
  }
  /**
   * Get user info
   * @return {Promise} Promise object represents user info
   * @memberof PokaAPI
   */
  async getUserInfo() {
    return await this.#fetch({ url: '/pokaapi/v2/user/' })
  }
  /**
   * Get system info
   * @return {Promise} Promise object represents system info
   * @memberof PokaAPI
   */
  async getSystemInfo() {
    return await this.#fetch({ url: '/pokaapi/v2/info/' })
  }
  /**
   * Get albums
   * @return {Promise} Promise object represents albums
   * @memberof PokaAPI
   */
  async getAlbums() {
    return await this.#fetch({ url: '/pokaapi/albums/' })
  }
  /**
   * Get album
   * @param  {string} source
   * @param  {string} id
   * @return {Promise} Promise object represents album
   * @memberof PokaAPI
   */
  async getAlbum(source, id) {
    source = encodeURIComponent(source)
    id = encodeURIComponent(id)
    return await this.#fetch({ url: `/pokaapi/album?moduleName=${source}&id=${id}` })
  }
  /**
   * Get artists
   * @return {Promise} Promise object represents album
   * @memberof PokaAPI
   */
  async getArtists() {
    return (await this.#fetch({ url: '/pokaapi/artists/' })).artists
  }
  /**
   * Get composers
   * @return {Promise} Promise object represents album
   * @memberof PokaAPI
   */
  async getComposers() {
    return (await this.#fetch({ url: '/pokaapi/composers/' })).composers
  }
  /**
   * Get artist albums
   * @param  {string} source
   * @param  {string} type
   * @param  {string} id
   * @return {Promise} Promise object represents artist albums
   * @memberof PokaAPI
   */
  async getArtistAlbums(source, type, id) {
    source = encodeURIComponent(source)
    type = encodeURIComponent(type)
    id = encodeURIComponent(id)
    let url
    if (type === 'artists') {
      url = `/pokaapi/artistAlbums/?moduleName=${source}&id=${id}`
    } else {
      url = `/pokaapi/composerAlbums/?moduleName=${source}&id=${id}`
    }
    return await this.#fetch({ url })
  }
  /**
   * Get artist albums
   * @param  {string} source
   * @param  {string} type
   * @param  {string} id
   * @return {Promise} Promise object represents artist albums
   * @memberof PokaAPI
   */
  async getArtistInfo(source, type, id) {
    source = encodeURIComponent(source)
    type = encodeURIComponent(type)
    id = encodeURIComponent(id)
    let url = `/pokaapi/${type}/?moduleName=${source}&id=${id}`
    return await this.#fetch({ url })
  }
  /**
   * Get Folders
   * @param  {string} source
   * @param  {string} id
   * @return {Promise} Promise object represents folders
   * @memberof PokaAPI
   */
  async getFolders(source, id) {
    let url = `/pokaapi/folders/`
    if (source && id) {
      source = encodeURIComponent(source)
      id = encodeURIComponent(id)
      url = `/pokaapi/folderFiles/?moduleName=${source}&id=${id}`
    }
    return await this.#fetch({ url })
  }
  /**
   * Get Playlists
   * @return {Promise} Promise object represents playlists
   * @memberof PokaAPI
   */
  async getPlaylists() {
    return await this.#fetch({ url: '/pokaapi/playlists/' })
  }
  /**
   * Get Playlist
   * @return {Promise} Promise object represents playlists
   * @memberof PokaAPI
   */
  async getPlaylist(source, id) {
    source = encodeURIComponent(source)
    id = encodeURIComponent(id)
    return await this.#fetch({ url: `/pokaapi/playlistSongs/?moduleName=${source}&id=${id}` })
  }
  /**
   * Get Home
   * @return {Promise} Promise object represents home
   * @memberof PokaAPI
   */
  async getHome() {
    return await this.#fetch({ url: '/pokaapi/home/' })
  }
  /**
   * Get Lyric By id
   * @param  {string} source
   * @param  {string} id
   * @return {Promise} Promise object represents lyric
   * @memberof PokaAPI
   */
  async getLyric(source, id) {
    return await this.#fetch({ url: `/pokaapi/lyric/?moduleName=${source}&id=${id}` })
  }
  /**
   * Get Lyric By Keyword
   * @param  {string} keyword
   * @return {Promise} Promise object represents lyric
   * @memberof PokaAPI
   */
  async getLyricByKeyword(keyword) {
    return await this.#fetch({ url: `/pokaapi/searchLyrics/?keyword=${keyword}` })
  }
  /**
   * Save lyric
   * @param  {string} title
   * @param  {string} artist
   * @param  {string} songId
   * @param  {string} source
   * @param  {string} lyric
   */
  async saveLyric({ title, artist, songId, source, lyric }) {
    return await this.#fetch({ url: `/pokaapi/lyric`, method: 'POST', body: { title, artist, songId, source, lyric } })
  }
  /**
   * Search
   * @param  {string} keyword
   * @return {Promise} Promise object represents search result
   * @memberof PokaAPI
   */
  async search(keyword) {
    return await this.#fetch({ url: `/pokaapi/search/?keyword=${keyword}` })
  }
  /**
   * Get pin status
   * @param  {string} source
   * @param  {string} id
   * @param  {string} name
   * @param  {string} type
   * @return {Promise} Promise object represents pin status
   * @memberof PokaAPI
  */
  async getPinStatus({ source, id, name, type }) {
    return await this.#fetch({ url: `/pokaapi/v2/pin/ispinned`, method: 'POST', body: { source, id, name, type } })
  }
  /**
   * Get pins
   * @return {Promise} Promise object represents pins
   * @memberof PokaAPI
  */
  async getPins() {
    return await this.#fetch({ url: `/pokaapi/v2/pin/pins`, method: 'POST' })
  }
  /**
   * Pin
   * @param  {string} source
   * @param  {string} id
   * @param  {string} name
   * @param  {string} cover
   * @param  {string} artist
   * @param  {string} type
   * @return {Promise} Promise object represents pin status
   * @memberof PokaAPI
   */
  async pin({ source, id, name, cover, type, artist }) {
    return await this.#fetch({ url: `/pokaapi/v2/pin/pin`, method: 'POST', body: { source, id, name, type, cover, artist } })
  }
  /**
   * Unpin
   * @param  {string} source
   * @param  {string} id
   * @param  {string} name
   * @param  {string} cover
   * @param  {string} artist
   * @param  {string} type
   * @return {Promise} Promise object represents pin status
   * @memberof PokaAPI
   */
  async unpin({ source, id, name, cover, type, artist }) {
    return await this.#fetch({ url: `/pokaapi/v2/pin/unpin`, method: 'POST', body: { source, id, name, type, cover, artist } })
  }
  /**
   * Check song exist in playlist
   * @param  {object} song
   * @return {Promise} Promise object represents playlist status
   * @memberof PokaAPI
   */
  async checkSongExistInPlaylist(song) {
    return await this.#fetch({ url: `/pokaapi/v2/playlist/song/exist`, method: 'POST', body: song })
  }
  /**
   * Toggle song in playlist
   * @param  {object} song
   * @param  {string} playlistId
   * @return {Promise} Promise object represents playlist status
   * @memberof PokaAPI
   */
  async toggleSongInPlaylist(song, playlistId) {
    return await this.#fetch({ url: `/pokaapi/v2/playlist/song`, method: 'POST', body: { song, playlistId } })
  }
  /**
   * Change User Name
   * @param  {string} name
   * @return {Promise} Promise object represents user name
   * @memberof PokaAPI
   */
  async changeUserName(n) {
    return await this.#fetch({ url: `/pokaapi/v2/user/name`, method: 'POST', body: { n } })
  }
  /**
   * Change User Username
   * @param  {string} username
   * @return {Promise} Promise object represents user username
   * @memberof PokaAPI
   */
  async changeUserUsername(n) {
    return await this.#fetch({ url: `/pokaapi/v2/user/username`, method: 'POST', body: { n } })
  }
  /**
   * Change User Password
   * @param  {string} oldpassword
   * @param  {string} password
   * @return {Promise} Promise object represents user password
   * @memberof PokaAPI
   */
  async changeUserPassword(oldpassword, password) {
    return await this.#fetch({ url: `/pokaapi/v2/user/password`, method: 'POST', body: { oldpassword, password } })
  }
  /**
   * Get user list
   * @return {Promise} Promise object represents user list
   * @memberof PokaAPI
   */
  async getUserList() {
    return await this.#fetch({ url: `/pokaapi/v2/users/list` })
  }
  /**
   * Create user
   * @param  {object} user
   * @param  {string} user.username
   * @param  {string} user.password
   * @param  {string} user.name
   * @param  {string} user.role
   * @return {Promise} Promise object represents user
   */
  async createUser({ username, password, name, role }) {
    return await this.#fetch({ url: `/pokaapi/v2/users/create`, method: 'POST', body: { username, password, name, role } })
  }
  /**
   * Change user password
   * @param  {string} _id
   * @param  {string} password
   * @return {Promise} Promise object represents result
   * @memberof PokaAPI
   */
  async changeUserPasswordById(_id, password) {
    return await this.#fetch({ url: `/pokaapi/v2/users/change-password`, method: 'POST', body: { _id, password } })
  }
  /**
   * Delete user
   * @param  {string} _id
   * @return {Promise} Promise object represents result
   * @memberof PokaAPI
   */
  async deleteUser(_id) {
    return await this.#fetch({ url: `/pokaapi/v2/users/delete`, method: 'POST', body: { _id } })
  }
  /**
   * Get log by page
   * @param  {number} page = 0
   * @return {Promise} Promise object represents log
   */
  async getLog(page = 0) {
    return await this.#fetch({ url: `/pokaapi/v2/log?page=${page}` })
  }
}