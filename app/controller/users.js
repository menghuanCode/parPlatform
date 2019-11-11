'use strict'

const { Controller } = require('egg')

class UsersController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.Users = ctx.model.Users
    this.Shops = ctx.model.Shops
  }

  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const prePage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    ctx.body = await this.Users
      .find({ $or: [{ name: new RegExp(q) }, { account: q }] })
      .limit(prePage)
      .skip(page * prePage)
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join('').replace('+password', '')
    const user = await this.Users.findById(ctx.params.id).select(selectFields)
    ctx.body = user
  }

  async create(ctx) {
    const Users = this.Users

    ctx.validate({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })

    const { name, password } = ctx.request.body
    const account = 10000 + await Users.count() + ''
    const user = await new Users({ name, account, password }).save()

    ctx.body = user
  }

  async update(ctx) {
    const Users = this.Users
    ctx.validate({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
    })

    const { name, password } = ctx.request.body
    const user = await Users.findByIdAndUpdate(ctx.params.id, { name, password })
    ctx.body = user
  }

  async destroy(ctx) {
    const Users = this.Users
    const user = await Users.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }

  async login(ctx) {
    ctx.validate({
      account: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })

    const Users = this.Users
    const user = await Users.findOne(ctx.request.body)
    if (!user) { ctx.throw(403, ' 账号或密码不正确') }
    const { _id, account, name, shop } = user
    const { secret } = this.config.jwt

    const token = this.app.jwt.sign({ _id, account, name, shop }, secret, { expiresIn: '1d' })
    ctx.body = { token }

  }

  async getUserShop(ctx) {
    const shop = await this.Shops.findOne({ owner: ctx.params.id })
    ctx.body = shop
  }

  async getUserOrders(ctx) {
    const Orders = ctx.model.Orders
    const order = await Orders.find({ user: ctx.params.id }).select('+shop+goods').populate('shop goods')
    ctx.body = order
  }
}

module.exports = UsersController
