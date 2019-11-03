'use strict'

module.exports = app => {

  const { router, controller } = app
  const { uploadAvatar } = controller.shops

  router.resources('shops', '/api/shops', controller.shops)
  router.post('/api/shops/upload', uploadAvatar)
}
