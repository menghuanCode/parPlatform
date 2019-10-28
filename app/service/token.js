'use strict'

const { Service } = require('egg')

class TokenService extends Service {
  async getAccessToken() {
    const Token = this.ctx.model.Token
    return await Token.findOne({ name: 'access_token' }).exec()
  }

  async saveAccessToken(data) {
    const Token = this.ctx.model.Token
    let token = await Token.findOne({ name: 'access_token' }).exec()
    if (token) {
      token.access_token = data.access_token
      token.expires_in = data.expires_in
    } else {
      token = new Token({
        name: 'access_token',
        expires_in: data.expires_in,
        access_token: data.access_token,
      })
    }

    await token.save()
    return data
  }
}

module.exports = TokenService
