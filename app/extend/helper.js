'use strict'

const xml2js = require('xml2js')
const Promise = require('bluebird')
const path = require('path')
const OSS = require('ali-oss')

module.exports = {
  parseXMLAsync(xml) {
    return new Promise(function(resolve, reject) {
      xml2js.parseString(xml, { trim: true }, function(err, content) {
        if (err) reject(err)
        else resolve(content)
      })
    })
  },
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
  },
  async ossPut(filename, file) {
    filename = filename || path.basename(file.filename)
    const client = new OSS({ ...this.config.oss })
    const result = await client.put(filename, file.filepath)
    console.log(result)
    return result
  },
  async get(url, options = {}) {
    if (!url) { return false }

    const defaultOptions = {
      dataType: 'json',
      timeout: 3000,
    }

    options = Object.assign({}, options, defaultOptions)

    const { ctx } = this
    const result = await ctx.curl(url, options)
    return result
  },
  async post(url, options = {}) {
    if (!url) { return false }

    const defaultOptions = {
      method: 'POST',
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送数据
      contentType: 'json',
      timeout: 3000,
      // 明确告诉 HttpClient 以 JSON 格式处理响应 body
      dataType: 'json',
    }

    options = Object.assign({}, options, defaultOptions)

    const { ctx } = this
    const result = await ctx.curl(url, options)
    return result
  },
  async delete(url, options = {}) {
    if (!url) { return false }

    const defaultOptions = {
      method: 'DELETE',
      dataType: 'json',
    }

    options = Object.assign({}, options, defaultOptions)

    const { ctx } = this
    const result = await ctx.curl(url, options)
    return result
  },
}
