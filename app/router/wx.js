'use strict'

module.exports = app => {

  const { router, controller, middleware } = app
  const { auth, messageReply } = controller.wx
  const { wx } = middleware

  router.get('/wx', wx, auth)
  router.post('/wx', wx, messageReply)
}
