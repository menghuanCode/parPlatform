'use strict'

const { Controller } = require('egg')

class ShopsController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.Shops = ctx.model.Shops
  }

  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const prePage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    ctx.body = await this.Shops
      .find({ $or: [{ name: new RegExp(q) }, { address: q }] })
      .limit(prePage)
      .skip(page * prePage)
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join('')
    const shop = await this.Shops.findById(ctx.params.id).select(`+goods${selectFields}`).populate('goods.foods')
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

    const owner = ctx.state.user._id
    const { avatar_url, name, address, phone } = ctx.request.body
    const shop = await new this.Shops({ avatar_url, name, address, phone, owner }).save()
    ctx.body = shop
  }

  async uploadAvatar() {
    const { ctx } = this;
    const file = ctx.request.files[0]

    const result = await this.ctx.helper.ossPut('users/user_id/shop/avatar.jpg', file)
    ctx.body = { url: result.url }
  }

  async update(ctx) {
    const Shops = ctx.model.Shops
    const shop = await Shops.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = shop
  }

  async destroy(ctx) {
    const Shops = this.Shops
    const shop = await Shops.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }

  async getShopCount(ctx) {
  }

}

module.exports = ShopsController
