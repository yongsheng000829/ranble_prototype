const Service = require('egg').Service;

class RoleService extends Service {
  
  async list(){
    const { app } = this;

    return await app.mysql.select('role',{where:{status:'1'}});

  }

  async insert(role){
    const { app } = this;
    return await app.mysql.insert('role',{role:role,status:'1'});
  }

}

module.exports = RoleService;