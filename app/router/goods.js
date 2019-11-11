'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { goods } = controller
  const { checkRepeatUserShop, checkShopOwner, checkShopExist } = middleware

  const { find, findById, create, uploadAvatar, update, destroy } = goods

  router.get('/api/goods', find)
  router.get('/api/goods/:id', checkShopExist(), findById)
  router.post('/api/goods', jwt, checkRepeatUserShop(), create)
  router.delete('/api/goods/:id', jwt, checkShopExist(), checkShopOwner(), destroy)
  router.patch('/api/goods/:id', jwt, update)
}
