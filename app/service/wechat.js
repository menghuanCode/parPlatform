'use strict'

const { Service } = require('egg')
const crypto = require('crypto')

class WechatService extends Service {
  constructor(ctx) {
    super(ctx)

    this.api = this.config.api
    const token = this.service.token
    this.getAccessToken = token.getAccessToken
    this.saveAccessToken = token.saveAccessToken
    this.getTicket = token.getTicket
    this.saveTicket = token.saveTicket
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
    if (data.errcode) {
      ctx.throw(data.errcode, data.errmsg)
    }
    const now = (new Date().getTime())
    const expires_in = now + (data.expires_in - 20) * 1000
    data.expires_in = expires_in
    return data
  }

  async fetchTicket(access_token) {
    const that = this

    let ticket = await this.getTicket()
    const isValidTicket = await this.isValidTicket(ticket)

    if (!isValidTicket) {
      ticket = await this.updateTicket(access_token)
      await this.saveTicket(ticket)
    }

    return ticket
  }

  async isValidTicket(data) {
    if (!data || !data.ticket || !data.expires_in) {
      return false
    }

    const ticket = data.ticket
    const expires_in = data.expires_in
    const now = (new Date().getTime())
    return ticket && now < expires_in
  }

  async updateTicket(access_token) {
    const { ctx, api } = this
    const url = `${api.ticket.get}?access_token=${access_token}&type=jsapi`
    const { data } = await ctx.helper.get(url)
    if (data.errcode) { ctx.throw(data.errcode, data.errmsg) }
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

  async createNonce() {
    return Math.random().toString(36).substr(2, 15)
  }

  async createTimestamp() {
    return parseInt(new Date().getTime() / 1000, 10) + ''
  }

  async _sign(noncestr, ticket, timestamp, url) {
    const params = [
      'noncestr=' + noncestr,
      'jsapi_ticket=' + ticket,
      'timestamp=' + timestamp,
      'url=' + url,
    ]

    const str = params.sort().join('&')
    const shasum = crypto.createHash('sha1')

    shasum.update(str)
    return shasum.digest('hex')
  }

  async sign(ticket, url) {
    const noncestr = await this.createNonce()
    const timestamp = await this.createTimestamp()
    const signature = await this._sign(noncestr, ticket, timestamp, url)

    console.log(noncestr, ticket, timestamp, url, signature)

    return {
      noncestr,
      timestamp,
      signature,
    }
  }

}

module.exports = WechatService
