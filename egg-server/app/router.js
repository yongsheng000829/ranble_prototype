'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.web.login.index);

  //首页旅行
  router.get('/travel/list', controller.web.travel.list);
  router.post('/travel/submit', controller.web.travel.submit);

  //产品
  router.get('/product/list', controller.web.product.list);
  router.post('/product/serach', controller.web.product.search);
  router.post('/product/detail',controller.web.product.detail);

  //游记
  router.get('/blog/list', controller.web.blog.list);
  router.post('/blog/search', controller.web.blog.search);


  //官网后台
  router.post('/crm/login', controller.crm.login.index);
  router.get('/crm/homemenu', controller.crm.home.menu);
  
  //旅游意向
  router.get('/crm/purpose', controller.crm.purpose.index);

  //用户列表
  router.get('/crm/userlist', controller.crm.user.index);
  router.put('/crm/userblack', controller.crm.user.black);

  //职员列表
  router.get('/crm/stafflist', controller.crm.staff.index);
  router.post('/crm/staffadd',controller.crm.staff.add);
  router.put('/crm/staffupdate',controller.crm.staff.leave);
  router.post('/crm/staffdetail',controller.crm.staff.detail)

  //角色列表
  router.get('/crm/rolelist', controller.crm.role.index);
  router.get('/crm/rolemenu',controller.crm.role.addmenu);
  router.post('/crm/rolesubmit',controller.crm.role.roleInsert);

  //修改密码
  router.post('/change/pwd',controller.crm.staff.changePwd);

  //游记管理
  router.get('/crm/bloglist', controller.crm.blog.list);
  router.put('/crm/bloghidden', controller.crm.blog.hidden);
  router.get('/crm/blogclass',controller.crm.blog.blogclass);
};
