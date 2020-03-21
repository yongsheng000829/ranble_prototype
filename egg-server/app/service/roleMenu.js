const Service = require('egg').Service;

class RoleMenuService extends Service {
  async find(roleid) {
    const { app } = this
    return await app.mysql.select('role_menu',{where:{roleid}});
  }

  async insert(roleid,menu){
    const { app } = this
    return await app.mysql.insert('role_menu',{roleid,menu});
  }

}

module.exports = RoleMenuService;