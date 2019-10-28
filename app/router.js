'use strict'

const fs = require('fs')
const path = require('path')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  const routerDir = path.join(__dirname, 'router')
  fs.readdirSync(routerDir).forEach(filename => {
    const file = path.join(__dirname, 'router', filename)

    require(file)(app)
  })

}
