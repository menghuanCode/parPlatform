'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { users } = controller
  const { checkOwner } = middleware

  const { find, findById, create, update, destroy, login, findUserOrders } = users

  router.get('/api/users', find)
  router.get('/api/users/:id', findById)
  router.post('/api/users', create)
  router.post('/api/users/login', login)
  router.patch('/api/users/:id', jwt, checkOwner(), update)
  router.delete('/api/users/:id', jwt, checkOwner(), destroy)
  router.post('/api/users/orders', jwt, checkOwner(), findUserOrders)
}
