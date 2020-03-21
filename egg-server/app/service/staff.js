const Service = require('egg').Service;

class StaffUserService extends Service {
  // 通过账号查找系统职员
  async find(user) {
    const { app } = this
    return await app.mysql.select('staff',{where:{user}});
  }
  // 通过id查找系统职员
  async findId(id) {
    const { app } = this
    return await app.mysql.select('staff',{where:{id}});
  }
  //展示系统职员
  async list(){
    const { app } = this
    return await app.mysql.select('staff');
  }
  // 入职
  async add(obj){
    const { app } = this
    return await app.mysql.insert('staff',obj);
  }
  // 离职
  async leave(id,outime){
    const { app } = this
    return await app.mysql.update('staff',{id,status:'2',outime});
  }

  //修改
  async change(obj){
    const { app } = this
    return await app.mysql.update('staff',obj);
  }

  

}

module.exports = StaffUserService;