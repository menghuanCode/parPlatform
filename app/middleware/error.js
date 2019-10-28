'use strict'

module.exports = (options, app) => {
  return async function errorMiddleware(ctx, next) {
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志

      let status = err.status || 500
      status = status === -1 ? 500 : status

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err

      if (status === 422) {
        ctx.body.detail = err.error
      }

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.status = status
      ctx.body = {
        stack: err.stack,
        message: err.message,
        name: err.name,
        status: err.status,
      }
    }

  }
}
