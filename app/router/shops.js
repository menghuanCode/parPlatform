'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { shops } = controller
  const { checkOwner, isValid } = middleware

  const { find, findById, create, uploadAvatar } = shops

  router.get('/api/shops', find)
  router.get('/api/shops/:id', isValid(), findById)
  router.post('/api/shops', jwt, create)
  router.post('/api/shops/upload', jwt, uploadAvatar)

}
