'use strict';

const Controller = require('egg').Controller;

class Blogontroller extends Controller {
  async list() {
    const { ctx ,app} = this;
    let data = await ctx.service.blog.list();
    ctx.body = app.sendMes(0,'',data)
  }
  // 发布游记 下架游记
  async hidden() {
    const { ctx ,app} = this;
    const {id,status} = ctx.request.body;
    const subTime = app.presentTime;
    let res = await ctx.service.blog.update({id,status,subTime} );

    if(res.affectedRows === 1){
        let data = await ctx.service.blog.list();
        ctx.body = app.sendMes(0,' 操作成功',data)
    }
  }
  //获取线上游记类别
  async blogclass() {
    const { ctx ,app} = this;
    let data = await ctx.service.blog.index();
        data = data.map(item=>item.class)
    ctx.body = app.sendMes(0,' 操作成功',data)
  }


}

module.exports = Blogontroller;