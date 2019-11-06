'use strict'

const { Controller } = require('egg')

class ShopsController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.Users = ctx.model.Users
    this.Shops = ctx.model.Shops
  }

  async find() {
    const { ctx } = this
    ctx.body = await this.Shops.find()
  }

  async findById() {
    const { ctx } = this
    const shop = await this.Shops.findById(ctx.params.id)
    if (!shop) { ctx.throw(404, '店鋪不存在') }

    ctx.body = shop
  }

  async create() {
    const { ctx } = this
    ctx.validate({
      avatar_url: { type: 'string', required: true },
      name: { type: 'string', required: true },
      address: { type: 'string', required: true },
      phone: { type: 'string', required: true },
    })

    const userid = ctx.state.user._id
    const { avatar_url, name, address, phone } = ctx.request.body
    const shop = await new this.Shops({ avatar_url, name, address, phone, user: userid }).save()
    await this.Users.findByIdAndUpdate(userid, { shop: shop._id })
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
