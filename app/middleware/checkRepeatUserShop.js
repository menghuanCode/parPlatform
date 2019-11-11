'use strict'

module.exports = (options, app) => {
  return async function checkRepeatUserShop(ctx, next) {
    const Shops = ctx.model.Shops
    const repeatedShop = await Shops.findOne({ owner: ctx.state.user._id })
    repeatedShop && ctx.throw(409, '用户已创建店铺')
    await next()
  }
}
