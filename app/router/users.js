'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { users } = controller
  const { checkOwner, checkUserExist, checkUserShopExist, checkRepeatUsername } = middleware

  const { find, findById, create, update, destroy, login, getUserShop, getUserOrders } = users

  router.get('/api/users', find)
  router.get('/api/users/:id', checkUserExist(), findById)
  router.post('/api/users', checkRepeatUsername(), create)
  router.post('/api/users/login', login)
  router.patch('/api/users/:id', jwt, checkOwner(), checkRepeatUsername(), checkUserExist(), update)
  router.delete('/api/users/:id', jwt, checkOwner(), checkUserExist(), destroy)
  router.get('/api/users/:id/shop', getUserShop)
  router.get('/api/users/:id/orders', getUserOrders)
}
