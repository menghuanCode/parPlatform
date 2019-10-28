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
    // ctx.verifyParams({
    //   // name: { type: 'string', required: true },
    //   // address: { type: 'string', required: true },
    //   // phone: { type: 'string', required: true },
    //   // avatar_url: { type: 'string', required: true },
    //   // delivery_fee: { type: 'string', required: true },
    //   // minimum_order_amount: { type: 'string', required: true },
    //   // description: { type: 'string', required: false },
    //   // slogan: { type: 'string', required: false },
    //   // startTime: { type: 'string', required: false },
    //   // endTime: { type: 'string', required: false },
    //   // business_license: { type: 'string', required: false },
    //   // service_license: { type: 'string', required: false },
    // })

    const shop = await new Shops(ctx.request.body).save()

    console.log(shop)
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
