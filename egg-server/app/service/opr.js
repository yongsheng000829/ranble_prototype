const Service = require('egg').Service;

class RoleService extends Service {
  
  async insert(roleid,opr){
    const { app } = this;
    return await app.mysql.insert('role_opr',{roleid,opr});
  }
  async find(roleid){
    const { app } = this;
    return await app.mysql.select('role_opr',{where:{roleid}});
  }

}

module.exports = RoleService;