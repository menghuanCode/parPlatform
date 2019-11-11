'use strict'
const fs = require('fs')
const path = require('path')

const { Controller } = require('egg')

class AdminController extends Controller {
  async ruin(ctx) {
    const { Shops, Users, Orders, Goods } = ctx.model
    await Shops.remove({})
    await Users.remove({})
    await Orders.remove({})
    await Goods.remove({})
    ctx.status = 204
  }
}

module.exports = AdminController
