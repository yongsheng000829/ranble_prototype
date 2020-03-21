const url = require('url')
const verfyType = require('../until/verifyType')
module.exports = options =>{
    return async (ctx,next)=> {
  
        //先根据来源判定当前是后台接口访问 还是前台接口访问
        let source = ctx.get('source')


        //判断来访路径是否需要做token校验
        if(options.includes(url.parse(ctx.url).pathname)){
            await next()
            return 
        }

        //验证cookie里是否存了token
        const token = ctx.cookies.get(source+'Token');

        if(!token){
            ctx.body = ctx.app.sendMes(1,'没有权限，请登录')
            return
        }

        //做用户退出
        if(url.parse(ctx.url).pathname == '/login/out'){
            
            ctx.cookies.set(source+'Token',null)
            ctx.body = ctx.app.sendMes(0,'您已退出登录状态')
            return 
        }
       
       //解密这个token之后是不是正确的用户信息
        let info
        try{
            info = await verfyType(token,source)
        }
        catch(error){
            ctx.body = ctx.app.sendMes(1,'权限无效，请登录')
            return
        }

        //登录超时
        let {signTime} = info;
        let nowTime = new Date().getTime();
        let time = (nowTime-signTime)/1000/60/60;
        if( time>=4){
            ctx.body = ctx.app.sendMes(1,'登录超时，请重新登录')
            return
        }

        ctx.info = info;
        await next()
    }
}