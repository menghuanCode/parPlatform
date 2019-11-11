'use strict';

const { Controller } = require('egg')

class WechatController extends Controller {

  async shop(ctx) {
    const data = await this.service.wechat.fetchAccessToken()
    const access_token = data.access_token
    const ticketData = await this.service.wechat.fetchTicket(access_token)
    const ticket = ticketData.ticket
    const url = ctx.href.replace(':28088', '').split('#')[0]

    const params = await this.service.wechat.sign(ticket, url)
    await ctx.render('wechat/shop.html', params)
  }

}

module.exports = WechatController

// 'use strict';

// const { Controller } = require('egg')


// class MenuController extends Controller {

//   async find() {
//     const { ctx, service, config } = this
//     const result = await service.wechat.getMenu()
//     ctx.status = 200
//     ctx.body = this.checkSuccess(result)
//   }

//   async create() {
//     const { ctx, service, config } = this

//     ctx.validate({
//       menu: { type: 'object', required: false },
//     })

//     const menu = ctx.request.body.menu || config.menu
//     const result = await service.wechat.createMenu(menu)
//     ctx.status = 200
//     ctx.body = this.checkSuccess(result)
//   }

//   async delete() {
//     const { ctx, service, config } = this
//     const result = await service.wechat.deleteMenu()
//     ctx.status = 200
//     ctx.body = this.checkSuccess(result)
//   }


//   checkSuccess(result) {
//     const { status, data } = result
//     if (status !== 200) {
//       const errorMsg = data && data.error_msg ? data.error_msg : 'unknown error'
//       this.ctx.throw(status, errorMsg)
//     }
//     return data
//   }

// }

// module.exports = MenuController;

