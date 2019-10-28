'use strict'

const { Controller } = require('egg')

class WxController extends Controller {
  async auth(ctx) {
    ctx.body = ctx.query.echostr
  }
  async messageReply(ctx) {
    const messageReply = await this.service.wx.messageReply(ctx)
    ctx.status = 200
    ctx.type = 'application/xml'
    ctx.body = await ctx.renderView('wx/reply.html', messageReply)
  }
}

module.exports = WxController
