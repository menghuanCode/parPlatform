'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { shops } = controller
  const { checkRepeatUserShop, checkShopOwner, checkShopExist } = middleware

  const { find, findById, create, uploadAvatar, update, destroy, getShopCount } = shops

  router.get('/api/shops', find)
  router.get('/api/shops/:id', checkShopExist(), findById)
  router.post('/api/shops', jwt, checkRepeatUserShop(), create)
  router.post('/api/shops/upload', jwt, uploadAvatar)
  router.delete('/api/shops/:id', jwt, checkShopExist(), checkShopOwner(), destroy)
  router.get('/api/shops/count', checkShopExist(), getShopCount)
  router.patch('/api/shops/:id', jwt, update)
}
