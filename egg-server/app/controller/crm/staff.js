'use strict';

const Controller = require('egg').Controller;

class StaffController extends Controller {
  async index() {
    const { ctx ,app} = this;
    let searchData = await ctx.service.staff.list();
    let data = searchData.map(item=>{
          return {
              id:item.id,
              name:item.name,
              sex:item.sex,
              status:item.status,
              time:item.time
          }
    })
    ctx.body = app.sendMes(0,'',data)
  }
  // 添加职员
  async add(){
    const { ctx ,app} = this;
    const { user,name,sex,time,roleid } = ctx.request.body;
    let obj            = {user,name,sex,time,roleid};
        obj.pwd        = '123456';
        obj.status     = '1';
        obj.createtime = new Date().getTime()
        obj.subtime    = new Date().getTime()
        
    //校验非空
    //校验该职员账号是否重复
    //假设无重复账号
    let res = await ctx.service.staff.add(obj)
    
    if(res.affectedRows === 1){
        ctx.body = app.sendMes(0,'添加成功')
        return
    }
    ctx.body = app.sendMes(1,'添加失败')
  }

  // 离职
  async leave(){
    const { ctx ,app} = this;
    const { id }   = ctx.request.body;
    let outime     = app.presentTime;
    let res        = await ctx.service.staff.leave(id,outime)
    let searchData = await ctx.service.staff.list();
    
    if(res.affectedRows === 1){
      ctx.body = app.sendMes(0,'离职操作成功',searchData)
      return
    }
    ctx.body = app.sendMes(1,'操作失败',searchData)
  }

  //查看职员详情
  async detail(){
    const { ctx ,app} = this;
    const { id } = ctx.request.body;
    let data = await ctx.service.staff.findId(id);

    delete data[0].pwd;
    delete data[0].subtime;
    delete data[0].createtime;
    data[0].sex = data[0].sex === '1'?'男':'女';
    
    ctx.body = app.sendMes(0,'',data)
  }
  //修改密码
  async changePwd(){
    const { ctx ,app} = this;
    const { old,news,sure } = ctx.request.body;

    const {id} = ctx.info;
    let res = await ctx.service.staff.findId(id);

    //密码不一致
    if(news!== sure){
      ctx.body = app.sendMes(1,'您设置的新密码不一致')
      return
    }
    //旧密码输入错误
    if(old !== res[0].pwd){
      ctx.body = app.sendMes(1,'您的旧密码验证失败')
      return
    }
    // 新旧密码一样
    if( news === res[0].pwd){
      ctx.body = app.sendMes(1,'与原密码一致，无需修改')
      return
    }
    //校验密码格式

    //修改密码
    let changeRes = await ctx.service.staff.change({id,pwd:news})
    if(changeRes.affectedRows === 1){
      ctx.body = app.sendMes(0,'密码修改成功，请重新登录')
      return
    }
    ctx.body = app.sendMes(1,'系统异常，修改失败')
  }
}

module.exports = StaffController;