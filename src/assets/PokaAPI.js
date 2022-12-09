export default class {
  #username = localStorage.getItem('username') || ''
  #password = localStorage.getItem('password') || ''
  constructor() {
  }
  /**
    * Send Login Request
    * @param  {string} username
    * @param  {string} password
    * @return {Promise}
    */
  async login(username, password) {
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