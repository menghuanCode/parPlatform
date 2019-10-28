'use strict'

const { Service } = require('egg')

class WechatService extends Service {
  constructor(ctx) {
    super(ctx)

    this.api = this.config.api
    const token = this.service.token
    this.getAccessToken = token.getAccessToken
    this.saveAccessToken = token.saveAccessToken
  }

  async fetchAccessToken() {
    const that = this

    let accessToken = await this.getAccessToken()
    const isValidAccessToken = await this.isValidAccessToken(accessToken)

    if (!isValidAccessToken) {
      accessToken = await this.updateAccessToken()
      await this.saveAccessToken(accessToken)
    }

    return accessToken
  }

  async isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false
    }

    const expires_in = data.expires_in
    const now = (new Date().getTime())
    return now < expires_in
  }

  async updateAccessToken() {
    const { ctx, config, api } = this
    const { appID, appSecret } = config.wx
    const url = `${api.accessToken}&appid=${appID}&secret=${appSecret}`
    const { data } = await ctx.helper.get(url)
    const now = (new Date().getTime())
    const expires_in = now + (data.expires_in - 20) * 1000
    data.expires_in = expires_in

    return data
  }

  async getMenu() {
    const { ctx, api } = this
    const { access_token } = await this.fetchAccessToken()
    const url = `${api.menu.get}?access_token=${access_token}`
    return await ctx.helper.get(url)
  }

  async createMenu(menu) {

    const { ctx, api } = this
    const { access_token } = await this.fetchAccessToken()
    const url = `${api.menu.create}?access_token=${access_token}`
    return await ctx.helper.post(url, { data: menu })
  }

  async deleteMenu() {
    const { ctx, api } = this
    const { access_token } = await this.fetchAccessToken()
    const url = `${api.menu.delete}?access_token=${access_token}`
    return await ctx.helper.get(url)
  }


}

module.exports = WechatService
