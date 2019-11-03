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
    if (!user) { ctx.throw(404, '用户不存在') }

    ctx.body = user
  }

  async create(ctx) {
    const Users = this.Users
    const data = ctx.request.body

    ctx.validate({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }, data)

    const { name } = data
    const repeatedUser = await Users.findOne({ name })
    if (repeatedUser) {
      ctx.throw(409, '用户已经存在')
    }

    data.account = 10000 + await Users.count() + ''
    const user = await new Users(data).save()

    ctx.body = user
  }

  async update(ctx) {
    const Users = this.Users
    const data = ctx.request.body
    ctx.validate({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      role: { type: 'int', required: false },
      shop_id: { type: 'string', required: false },
    }, data)

    const { name } = data
    const repeatedUser = await Users.findOne({ name })
    if (repeatedUser) {
      ctx.throw(409, '用户名已存在')
    }

    delete data.account
    const user = await Users.findByIdAndUpdate(ctx.params.id, data)
    if (!user) { ctx.throw(404, '用户不存在') }
    ctx.body = user
  }

  async destroy(ctx) {
    const Users = this.Users
    const user = await Users.findByIdAndRemove(ctx.params.id)
    if (!user) { ctx.throw(404, '用户不存在') }
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

  async findUserOrders(ctx) {
    const Users = this.Users
    const user = await Users.findOne(ctx.request.body)
    if (!user) { ctx.throw(401, ' 账号或密码不正确') }
    const { _id, account, name } = user
    const { secret } = this.config.jwt
    const token = this.app.jwt.sign({ _id, account, name }, secret, { expiresIn: '1d' })
    ctx.body = { token }
  }
}

module.exports = UsersController
