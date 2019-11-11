'use strict'

const { Controller } = require('egg')

class OrdersController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.Orders = ctx.model.Orders
    this.Shops = ctx.model.Shops
  }

  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const prePage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    ctx.body = await this.Orders
      .find({ $or: [{ status: q }] })
      .limit(prePage)
      .skip(page * prePage)
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query
    const order = await this.Orders.findById(ctx.params.id).select('+shop+user+goods').populate('shop user goods')
    ctx.body = order
  }

  async create(ctx) {
    const Orders = this.Orders
    const Shops = ctx.model.Shops
    const Goods = ctx.module.Goods

    ctx.validate({
      shop: { type: 'string', required: true },
      goods: { type: [ 'string', 'array' ], required: true },
    })

    const { shop: shopId, goods: goodsId } = ctx.request.body
    const shop = await Shops.find({ _id: shopId })
    const goods = await Goods.find({ shop: shopId })

    if (!shop) {
      ctx.throw(404, '店铺不存在')
    }

    const order = await new Orders({ user: ctx.user.state._id, shop, goods }).save()
    ctx.body = order
  }

  async update(ctx) {
    const Orders = this.Orders
    ctx.validate({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
    })

    const { name, password } = ctx.request.body
    const user = await Orders.findByIdAndUpdate(ctx.params.id, { name, password })
    ctx.body = user
  }

  async destroy(ctx) {
    const Orders = this.Orders
    const user = await Orders.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }

  async everyDayCount(ctx) {
    const Orders = ctx.model.Orders
    const orders = await Orders.find({ createdAt: { $gt: new Date('2019-11-9') } })
    ctx.body = orders
  }
}

module.exports = OrdersController
