'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { users } = controller
  const { checkOwner, checkUserExist, checkRepeatUser } = middleware

  const { find, findById, create, update, destroy, login, orders } = users

  router.get('/api/users', find)
  router.get('/api/users/:id', checkUserExist(), findById)
  router.post('/api/users', checkRepeatUser(), create)
  router.post('/api/users/login', login)
  router.patch('/api/users/:id', jwt, checkOwner(), checkRepeatUser(), checkUserExist(), update)
  router.delete('/api/users/:id', jwt, checkOwner(), checkUserExist(), destroy)
  router.get('/api/users/:id/orders', orders)

}
