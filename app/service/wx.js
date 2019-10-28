'use strict'

const { Service } = require('egg')
const rawBody = require('raw-body')
const xml2js = require('xml2js')
const Promise = require('bluebird')

class WxService extends Service {

  async messageReply(ctx) {
    const data = await this.getRawBody(ctx)
    const content = await this.parseXMLAsync(data)
    const message = await this.formatMessage(content.xml)
    return this.reply(message)
  }

  async getRawBody(ctx) {
    return rawBody(ctx.req, {
      length: ctx.length,
      limit: '1mb',
      encoding: ctx.charset,
    })
  }

  parseXMLAsync(xml) {
    return new Promise(function(resolve, reject) {
      xml2js.parseString(xml, { trim: true }, function(err, content) {
        if (err) reject(err)
        else resolve(content)
      })
    })
  }

  formatMessage(result) {
    const message = {}
    if (typeof result === 'object') {
      const keys = Object.keys(result)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const item = result[key]
        if (!(item instanceof Array) || item.length === 0) {
          continue
        }
        if (item.length === 1) {
          const val = item[0]
          if (val instanceof Object) {
            message[key] = this.formatMessage(val)
          } else {
            message[key] = (val || '').trim()
          }
        } else {
          message[key] = []
          for (let j = 0, k = item.length; j < k; j++) {
            message[key].push(this.formatMessage(item[j]))
          }
        }
      }
    }
    return message
  }

  reply(message) {
    const reply = message.MsgType !== 'text' ? this.eventReply(message) : this.textReply(message)
    return this.tpl(reply, message)
  }

  eventReply(message) {
    if (message.MsgType !== 'event') {
      return false
    }

    const reply = {}
    const key = message.Event

    reply.subscribe = '你好，欢迎关注港饮店\n' +
                      '点击[我要下单]立即开始下单'

    return reply[key]
  }

  textReply(message) {
    const reply = {}
    const defaultReply = '额，你说的' + message.Content + '太复杂了'
    const key = message.content

    return reply[key] || defaultReply
  }


  tpl(content, message) {
    const info = { ...message }
    let type = 'text'

    if (Array.isArray(content)) {
      type = 'news'
    }

    type = content.type || type
    info.Content = content
    info.CreateTime = new Date().getTime()
    info.MsgType = type

    return info
  }

}

module.exports = WxService
