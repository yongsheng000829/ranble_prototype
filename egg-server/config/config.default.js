/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config    = exports = {};
  //不需要携带token就能访问的接口
  const writeList = require('./writeList');
  //需要有操作权限才能访问的接口
  const handle    = require('./handle')

  //当前系统所配置的全部视图权限
  const Menus     = require('./menu')
  //当前系统所配置的全部操作权限类型
  const Oprs      = require('./opr')


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582526804220_6280';

  config.middleware = ['jwt','handle'];
  config.jwt        = writeList;
  config.handle     = handle;
  config.urlType    = Menus;
  config.opr        = Oprs;
  const userConfig = {   
    security : {csrf: false},
    mysql : {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'rootroot',
        database: 'web',
      },
      app: true,
      agent: false
    },
    validate:{
      convert:false, //不开启类型转换
      validateRoot:false //被验证的变量不限制对象
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
