class AuthToken {
  private _token: string
  constructor() {
    this._token = ''
  }

  getToken() {
    return this._token
  }

  setToken(newToken: string) {
    this._token = newToken
  }
}

const authToken = new AuthToken()

export default authToken
