'use strict'

module.exports = (options, app) => {
  return async function errorMiddleware(ctx, next) {
    try {
      await next()
    } catch (err) {
      ctx.body = err
    }
  }
}
