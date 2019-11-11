'use strict'

module.exports = (options, app) => {
  return async function checkShopExist(ctx, next) {
    const Shops = ctx.model.Shops
    const shop = await Shops.findById(ctx.params.id)
    if (!shop) { ctx.throw(404, '店铺不存在') }
    await next()
  }
}
