'use strict'
const fs = require('fs')
const path = require('path')

const { Controller } = require('egg')

class HomeController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.Home = ctx.model.Home
    this.Shops = ctx.model.Shops
  }

  async index(ctx) {
    ctx.body = 123
  }
}

module.exports = HomeController
