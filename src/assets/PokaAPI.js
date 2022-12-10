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
}