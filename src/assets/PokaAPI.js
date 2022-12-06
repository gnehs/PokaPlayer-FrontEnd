export default class {
  #server
  #username
  #password
  #isLogin = false
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
    await fetch(this.#server + '/logout/')
    return await fetch(this.#server + '/login/', {
      method: 'POST',
      body: {
        username: this.#username,
        password: this.#password
      }
    }).then(response => response.json())
  }
}