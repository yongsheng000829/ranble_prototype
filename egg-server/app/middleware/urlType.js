
const url = require('url')

module.exports = option =>{
    return async (ctx,next) =>{

        //判断来访路径是否需要做token校验
        if(url.parse(ctx.url).pathname === '/crm/login'){
            await next()
            return 
        }

        //所有权限
        let roleid    = ctx.info.roleid;
        let arr       = await ctx.service.roleMenu.find(roleid);
        let urlcookie = arr.map(item => item.menu).map(jtem=>option[jtem].to)
        ctx.cookies.set(urlcookie,urlcookie) 

        await next()

    }
}