'use strict'

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    const Shops = ctx.model.Shops
    const shop = await Shops.findById(ctx.params.id)
    if (shop.owner && shop.owner.toString() !== ctx.state.user._id) ctx.throw(403, '没有权限')
    ctx.state.shop = shop
    await next()
  }
}
