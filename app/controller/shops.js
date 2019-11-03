'use strict'

const { Controller } = require('egg')

class ShopsController extends Controller {
  async index() {
    const { ctx } = this
    const Shops = ctx.model.Shops
    ctx.body = await Shops.find()
  }

  async show() {
    const { ctx } = this
    const Shops = ctx.model.Shops
    const shop = await Shops.findById(ctx.params.id)
    if (!shop) { ctx.throw(404, '店鋪不存在') }

    ctx.body = shop
  }

  async create() {
    const { ctx } = this
    const Shops = ctx.model.Shops
    ctx.validate({
      avatar_url: { type: 'string', required: true },
      name: { type: 'string', required: true },
      address: { type: 'string', required: true },
      phone: { type: 'string', required: true },
    })

    const shop = await new Shops(ctx.request.body).save()
    ctx.body = shop

  }

  async uploadAvatar() {
    const { ctx } = this;
    const file = ctx.request.files[0]

    const result = await this.ctx.helper.ossPut('users/user_id/shop/avatar.jpg', file)
    ctx.body = { url: result.url }
  }
}

module.exports = ShopsController
