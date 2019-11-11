'use strict'

module.exports = (options, app) => {
  return async function checkShopExist(ctx, next) {
    const { Shops } = ctx.model
    const shop = await Shops.findOne({ owner: ctx.params.id })
    if (!shop) { ctx.throw(404, '用户没有创建店铺') }
    ctx.state.shop = shop
    await next()
  }
}
