/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')
const os = require('os')

/**
 * @param {Egg.EggAppInfo} app app info
 */
module.exports = app => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = app.name + '_1571341485885_488';

  // add your middleware config here
  config.middleware = [
    'error',
  ];

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  }

  config.mongoose = {
    url: 'mongodb+srv://xiao:xiaoshop.top@xiao-d1dqa.mongodb.net/test',
    options: {
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    // plugins: [createdPlugin, [updatedPlugin, pluginOptions]]
  }

  config.security = {
    csrf: {
      ignore: '/wx',
      enable: false,
    },
  }

  config.cors = {
    origin: '*',
  }

  config.multipart = {
    mode: 'file',
    tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', app.name),
    cleanSchedule: {
      // run tmpdir clean job on every day 04:30 am
      // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
      cron: '0 30 4 * * *',
    },
    fileSize: '5mb',
  }

  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    extendTypes: {
      text: [ 'text/xml', 'application/xml' ],
    },
  }

  config.jwt = {
    secret: 'xiaoshoptop',
  }

  config.validate = {
    convert: true,
    widelyUndefined: true,
  }

  config.static = {
    dir: [{
      prefix: '/app',
      dir: path.join(app.baseDir, 'app/web/dist'),
    }],
  }

  // add your user config here
  const prefix = 'https://api.weixin.qq.com/cgi-bin/'
  const mpPrefiex = 'https://mp.weixin.qq.com/cgi-bin/'
  const userConfig = {
    // myAppName: 'egg',
    root: path.join(__dirname, '..'),
    wx: {
      // appID: 'wxe7bfea126adbf8d6',
      // appSecret: '4200f37bf6ed3a4d9759ee4a1d24fc8c',
      appID: 'wxf8b485f5bae501b3',
      appSecret: '4bedda091fd7144ef1c77efadab57c92',
      // baseUrl: "http://xiao.frp.xiaoshop.top",
      token: 'xiaoshop',
    },
    api: {
      semanticUrl: 'https://api.weixin.qq.com/semantic/semproxy/search',
      accessToken: prefix + 'token?grant_type=client_credential',
      temporary: {
        upload: prefix + 'media/upload',
        fetch: prefix + 'media/get',
      },
      permanent: {
        upload: prefix + 'material/add_material',
        fetch: prefix + 'material/get_material',
        delete: prefix + 'material/del_material',
        update: prefix + 'material/update_news',
        uploadNews: prefix + 'material/add_news',
        uploadNewsPic: prefix + 'media/uploadimg',
        count: prefix + 'material/get_materialcount',
        batch: prefix + 'material/batchget_material',
      },
      group: {
        create: prefix + 'groups/create',
        fetch: prefix + 'groups/get',
        check: prefix + 'groups/getid',
        update: prefix + 'groups/update',
        move: prefix + 'groups/members/update',
        batchupdate: prefix + 'groups/members/batchupdate',
        delete: prefix + 'groups/delete',
        // create: prefix + 'tags/create',
        // get: prefix + 'tags/get',
        // update: prefix + 'tags/update',
        // delete: prefix + 'tags/delete',
        // batchTag: prefix + 'tags/members/batchtagging',
        // batchUntag: prefix + 'tags/members/batchuntagging',
        // getUser: prefix + 'user/tags/get',
        // getIdList: prefix + 'tags/getidlist'
      },
      user: {
        remark: prefix + 'user/info/updateremark',
        fetch: prefix + 'user/info',
        batchFetch: prefix + 'user/info/batchget',
        list: prefix + 'user/get',
      },
      mass: {
        group: prefix + 'message/mass/sendall',
        openid: prefix + 'message/mass/send',
        delete: prefix + 'message/mass/delete',
        preview: prefix + 'message/mass/preview',
        check: prefix + 'message/mass/get',
      },
      menu: {
        create: prefix + 'menu/create',
        get: prefix + 'menu/get',
        delete: prefix + 'menu/delete',
        current: prefix + 'get_current_selfmenu_info',
      },
      qrcode: {
        create: prefix + 'qrcode/create',
        show: mpPrefiex + 'showqrcode',
      },
      shortUrl: {
        create: prefix + 'shorturl',
      },
      ticket: {
        get: prefix + 'ticket/getticket',
      },
    },
    menu: {
      button: [{
        type: 'view',
        name: '我要下单',
        url: 'http://mp.weixin.qq.com',
      }, {
        name: '个人中心',
        sub_button: [{
          type: 'view',
          name: '联系客服',
          url: 'http://mp.weixin.qq.com',
        }, {
          type: 'view',
          name: '订单查询',
          url: 'http://mp.weixin.qq.com',
        }, {
          type: 'view',
          name: '个人中心',
          url: 'http://mp.weixin.qq.com',
        }],
      }],
    },
    oss: {
      region: 'oss-cn-shenzhen',
      accessKeyId: 'LTAI4Fxb7UGdLKtsswTfSYiv',
      accessKeySecret: 'JyHpGu9hFcffWUzYQdvDXZwXknaBpQ',
      bucket: 'xiaoshoppic',
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};
