'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { orders } = controller
  const { checkOwner } = middleware

  const { find, findById, create, update, destroy } = orders

  router.get('/api/orders', find)
  router.get('/api/orders/:id', findById)
  router.post('/api/orders', create)
  router.patch('/api/orders/:id', jwt, checkOwner(), update)
  router.delete('/api/orders/:id', jwt, checkOwner(), destroy)
}
