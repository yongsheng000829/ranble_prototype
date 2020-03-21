'use strict';

const Controller = require('egg').Controller;

class CrmHomeController extends Controller {
  async menu() {
    const { ctx,app} = this;

    let roleid     = ctx.info.roleid;
    let searchRole = await ctx.service.roleMenu.find(roleid);


    
    let menuData   = app.config.urlType;
    let data       = []

    searchRole.map(item=>item.menu).map( item => {
      //创建一个二级路由对象
      let sonObj = {
        title:menuData[item].title,
        to:menuData[item].to,
        key:item
      }

      //判断这个二级路由的所属类别是否已存在data中
      let index = data.findIndex(j=>j.class === menuData[item].class)
      //如果当前父类存在
      if(index!==-1){
        data[index].sub.push(sonObj)
        return 
      }
      //父类不存在
      data.push({
        class:menuData[item].class,
        sub:[sonObj]
      })
    })

    ctx.body = app.sendMes(0,'请求成功',data)
  }
}

module.exports = CrmHomeController;
