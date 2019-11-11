'use strict'

const { Controller } = require('egg')

class GoodsController extends Controller {

  async find(ctx) {
    const Goods = ctx.model.Goods
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const prePage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    ctx.body = await Goods
      .find({ $or: [{ name: new RegExp(q) }, { goodsId: q }] })
      .limit(prePage)
      .skip(page * prePage)
  }

  async findById(ctx) {
    const Goods = ctx.model.Goods
    const { fields = '' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join('')
    const goods = await Goods.findById(ctx.params.id).select(`+goods${selectFields}`).populate('goods')
    ctx.body = goods
  }

  async create(ctx) {
    const { Goods, Shops } = ctx.model

    ctx.validate({
      avatar_url: { type: 'string', required: true },
      name: { type: 'string', required: true },
      desc: { type: 'string', required: true },
      price: { type: 'string', required: true },
      shopId: { type: 'string', required: true },
      category: { type: 'string', required: true },
    })

    const { category, shopId } = ctx.request.body
    const goods = await new Goods(ctx.request.body).save()
    const shop = await Shops.findById(shopId).select('+goods')

    let hasCategory = false

    for (let i = 0; i < shop.goods.length; i++) {
      const item = shop.goods[i]
      if (item.name === category) {
        item.foods.push(goods._id)
        hasCategory = true
      }
    }

    !hasCategory && shop.goods.push({
      name: category,
      foods: [ goods._id ],
    })

    shop.save()
    ctx.body = goods
  }

  async update(ctx) {
    const Goods = ctx.model.Goods
    const goods = await Goods.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = goods
  }

  async destroy(ctx) {
    const Goods = ctx.model.Goods
    const goods = await Goods.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }


}

module.exports = GoodsController
