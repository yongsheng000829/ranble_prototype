
const url = require('url')
module.exports = option =>{
    return async (ctx,next) =>{

        //判断请求地址是否要校验操作权限
        let index = option.findIndex(item=>item.path === url.parse(ctx.url).pathname)
        
        if(index!==-1){

            let roleid = ctx.info.roleid;
            let search = await ctx.service.opr.find(roleid)
                search = search.map(item=>item.opr)
            
            if(!search.includes(option[index].type)){
                ctx.body = ctx.app.sendMes('1','无权操作')
                return 
            }   
            
            await next()
            return 
        }

        await next()
    }
}