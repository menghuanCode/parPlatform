'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { users } = controller
  const { checkOwner, isValid, checkUserExist, checkRepeatUsername } = middleware

  const { find, findById, create, update, destroy, login, orders } = users

  router.get('/api/users', find)
  router.get('/api/users/:id', isValid(), checkUserExist(), findById)
  router.post('/api/users', checkRepeatUsername(), create)
  router.post('/api/users/login', login)
  router.patch('/api/users/:id', jwt, isValid(), checkOwner(), checkRepeatUsername(), checkUserExist(), update)
  router.delete('/api/users/:id', jwt, isValid(), checkOwner(), checkUserExist(), destroy)
  router.get('/api/users/:id/orders', orders)

}
