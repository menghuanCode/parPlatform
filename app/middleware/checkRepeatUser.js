'use strict'

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    const Users = ctx.model.Users
    const { name } = ctx.request.body
    const repeatedUser = await Users.findOne({ name })
    repeatedUser && ctx.throw(409, '用户已经存在')
    await next()
  }
}
