const Service = require('egg').Service;

class BlogService extends Service {
  async index(){
    const { app } = this;
    return await app.mysql.select('blog',{where:{status:'1'}});
  }
  async list(){
    const { app } = this;
    return await app.mysql.select('blog');
  }
  async update(obj){
    const { app } = this
    return await app.mysql.update('blog',obj);
  }
}

module.exports = BlogService;