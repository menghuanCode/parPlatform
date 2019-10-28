'use strict'

const sha1 = require('sha1')
const getRawBody = require('raw-body')

module.exports = (options, app) => {
  return async function wxMiddleware(ctx, next) {

    const { token } = options
    const { signature, nonce, timestamp, echostr } = ctx.query

    const str = [ token, timestamp, nonce ].sort().join('')
    const sha = sha1(str)

    if (sha !== signature) {
      ctx.body = 'wrong'
      return false
    }

    console.log(signature)
    await next()

  }
}
