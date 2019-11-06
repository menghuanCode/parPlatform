'use strict'

module.exports = (options, app) => {
  return async function checkRepeatCreateShop(ctx, next) {
    const Users = ctx.model.Users
    const user = await Users.findById(ctx.state.user._id)
    const repeatedShop = user.shop
    repeatedShop && ctx.throw(409, '该用户已注册店铺')
    await next()
  }
}
