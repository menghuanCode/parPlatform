'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { shops } = controller
  const { checkOwner } = middleware

  const { find, findById, create, update, destroy, orders } = shops

  router.get('/api/shops', find)
  router.get('/api/shops/:id', findById)
  router.post('/api/shops', jwt, create)
  // router.patch('/api/shops/:id', jwt, checkOwner(), update)
  // router.delete('/api/shops/:id', jwt, checkOwner(), destroy)
  // router.get('/api/shops/:id/orders', orders)

}
