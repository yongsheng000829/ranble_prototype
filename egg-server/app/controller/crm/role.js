'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  //角色列表
  async index() {
    const { ctx ,app} = this;
    let data = await ctx.service.role.list();
    ctx.body = app.sendMes(0,'',data)
  }
  //禁用接口

  //添加角色的菜单权限接口
  async addmenu(){
    const { ctx ,app} = this;
    
    //菜单权限的数据返回
    let data = [];
    const menuData = app.config.urlType;

    Object.keys(menuData).map(i=>{

      let index = data.findIndex(item=>item.title === menuData[i].class);
      if(index !== -1){
        data[index].children.push({
          title:menuData[i].title,
          key:i
        })
        return 
      }

      data.push({
        title:menuData[i].class,
        key:'sub'+(data.length+1),
        children:[
          {
            title:menuData[i].title,
            key:i
          }
        ]})
    })

    //操作权限的数据返回
    let opr = [];
    const oprData  = app.config.opr;
    Object.keys(oprData).map(item=>opr.push({
      title:oprData[item],
      key:item
    }))


    ctx.body = app.sendMes(0,'',{data,opr})

  }

  //角色添加
  async roleInsert(){
    const { ctx ,app} = this;
    const {role,subMenu,oprArr} = ctx.request.body;

    // 插入一个角色，并拿到角色ID
    let insertRes = await ctx.service.role.insert(role);
    if(insertRes.affectedRows === 1){
      let roleid = insertRes.insertId;
      oprArr.forEach(async item => await ctx.service.opr.insert(roleid,item))
      subMenu.forEach(async item => await ctx.service.roleMenu.insert(roleid,item))
      ctx.body = app.sendMes(0,'角色增加成功')
      return
    }
    ctx.body = app.sendMes(1,'角色增加失败')

  }

}

module.exports = RoleController;