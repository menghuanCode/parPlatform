'use strict'

module.exports = app => {

  const { router, controller, middleware } = app
  const { wechat } = controller
  const { shop } = wechat

  router.get('/wechat/shop', shop)
}
