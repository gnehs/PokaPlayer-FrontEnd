export default class {
  #server = localStorage.getItem('server') || ''
  #username = localStorage.getItem('username') || ''
  #password = localStorage.getItem('password') || ''
  constructor() {
  }
  /**
    * Send Login Request
    * @param  {string} server
    * @param  {string} username
    * @param  {string} password
    * @return {Promise}
    */
  async login(server, username, password) {
    this.#server = server.replace(/\/$/, '') // remove last "/"
    this.#username = username
    this.#password = password
    await fetch('/pokaapi/v2/user/logout/')

    let res = await fetch('/pokaapi/v2/user/login/', {
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify({
        username: this.#username,
        password: this.#password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    if (res.success) {
      localStorage.setItem('server', this.#server)
      localStorage.setItem('username', this.#username)
      localStorage.setItem('password', this.#password)
    }
    return res
  }
  /**
   * Get user info
   * @return {Promise}
   */
  async getUserInfo() {
    return await fetch('/pokaapi/v2/user/', {
      method: 'GET',
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())

  }
}