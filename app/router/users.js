'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { find, findById, create, update, destroy, login } = controller.users
  const { checkOwner } = middleware

  router.get('/api/users', find)
  router.get('/api/users/:id', findById)
  router.post('/api/users', create)
  router.patch('/api/users/:id', jwt, checkOwner(), update)
  router.delete('/api/users/:id', jwt, checkOwner(), destroy)
  router.post('/api/users/login', login)
}
