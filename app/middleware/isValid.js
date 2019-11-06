'use strict'
const mongoose = require('mongoose')

module.exports = () => {
  return async function isValid(ctx, next) {
    const isValid = mongoose.Types.ObjectId.isValid(ctx.params.id)
    if (!isValid) { ctx.throw(403, '不是合法的id') }
    await next()
  }
}
