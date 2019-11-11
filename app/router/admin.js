'use strict'

module.exports = app => {

  const { router, controller, middleware, jwt } = app
  const { admin } = controller

  const { ruin } = admin

  // router.delete('/api/admin/ruin', ruin)
}
