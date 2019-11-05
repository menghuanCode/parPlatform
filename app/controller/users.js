'use strict'

const { Controller } = require('egg')

class UsersController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.Users = ctx.model.Users
  }

  async find(ctx) {
    ctx.body = await this.Users.find()
  }

  async findById(ctx) {
    const user = await this.Users.findById(ctx.params.id)
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
      role: { type: 'int', required: false },
    })

    const { name, password, role } = ctx.request.body
    const user = await Users.findByIdAndUpdate(ctx.params.id, { name, password, role })
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
    if (!user) { ctx.throw(401, ' 账号或密码不正确') }
    const { _id, account, name } = user
    const { secret } = this.config.jwt
    const token = this.app.jwt.sign({ _id, account, name }, secret, { expiresIn: '1d' })
    ctx.body = { token }

  }

  async orders(ctx) {
    const Users = this.Users
    const user = await Users.findById(ctx.params.id).select('+orders').populate('orders')
    if (!user) { ctx.throw(404) }
    ctx.body = user.orders
  }

}

module.exports = UsersController
