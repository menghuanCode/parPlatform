'use strict'

module.exports = app => {

  const { router, controller, middleware } = app
  const { find, create, delete: del } = controller.wechat.menu
  
  router.get('/wechat/menu/', find)
  router.post('/wechat/menu/', create)
  router.delete('/wechat/menu/', del)
}
