'use strict'

const { Controller } = require('egg')

class OrdersController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.Orders = ctx.model.Orders
  }

  async find(ctx) {
    ctx.body = await this.Orders.find()
  }

  async findById(ctx) {
    const Order = await this.Orders.findById(ctx.params.id)
    if (!Order) { ctx.throw(404, '订单不存在') }

    ctx.body = Order
  }

  async create(ctx) {
    const Orders = this.Orders
    const data = ctx.request.body

    ctx.validate({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }, data)

    const { name } = data
    const repeatedOrder = await Orders.findOne({ name })
    if (repeatedOrder) {
      ctx.throw(409, '订单已经存在')
    }

    data.account = 10000 + await Orders.count() + ''
    const Order = await new Orders(data).save()

    ctx.body = Order
  }

  async update(ctx) {
    const Orders = this.Orders
    const data = ctx.request.body
    ctx.validate({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      role: { type: 'int', required: false },
      shop_id: { type: 'string', required: false },
    }, data)

    const { name } = data
    const repeatedOrder = await Orders.findOne({ name })
    if (repeatedOrder) {
      ctx.throw(409, '订单名已存在')
    }

    delete data.account
    const Order = await Orders.findByIdAndUpdate(ctx.params.id, data)
    if (!Order) { ctx.throw(404, '订单不存在') }
    ctx.body = Order
  }

  async destroy(ctx) {
    const Orders = this.Orders
    const Order = await Orders.findByIdAndRemove(ctx.params.id)
    if (!Order) { ctx.throw(404, '用户不存在') }
    ctx.status = 204
  }

  async login(ctx) {
    ctx.validate({
      account: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })

    const Orders = this.Orders
    const Order = await Orders.findOne(ctx.request.body)
    if (!Order) { ctx.throw(401, ' 账号或密码不正确') }
    const { _id, account, name } = Order
    const { secret } = this.config.jwt
    const token = this.app.jwt.sign({ _id, account, name }, secret, { expiresIn: '1d' })
    ctx.body = { token }

  }
}

module.exports = OrdersController
