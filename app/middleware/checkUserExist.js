'use strict'

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    const Users = ctx.model.Users
    const user = await Users.findById(ctx.params.id)
    if (!user) { ctx.throw(404, '用户不存在') }
    await next(user)
  }
}
