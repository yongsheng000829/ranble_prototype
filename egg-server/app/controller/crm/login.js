'use strict';

const Controller = require('egg').Controller;
const jwt        = require('jsonwebtoken');
class LoginController extends Controller {
  async index() {
    const { ctx ,app} = this;
    const { user,pwd} = ctx.request.body;
    //验证用户是否存在
    let userRes = await ctx.service.staff.find(user)
        
    if(userRes.length === 0){
      ctx.body = app.sendMes(1,'用户不存在');
      return
    }
    //验证密码是否正确
    if(userRes[0].pwd!==pwd){
      ctx.body = app.sendMes(1,'密码错误');
      return
    }

    //生成token
    let obj         = {...userRes[0],signTime:app.presentTime}
    let crmToken = jwt.sign(obj,'crm');

    //cookie 存token
    ctx.cookies.set('crmToken',crmToken);
    ctx.body = app.sendMes(0,'登录成功');
  }
}

module.exports = LoginController;