import React,{useState} from 'react'
import { Input, Button } from 'antd';

    //提交函数
let submit = (user,pwd,push) => {
    const { httpSuccess,isNull,regType,dataJson } = React.Meili;
    //非空 正则校验
    let checkArr = [dataJson('账号',user,'user'),dataJson('密码',pwd,'pwd')];
    
    isNull(checkArr,()=>regType(checkArr,()=>httpSuccess(['post','/crm/login',{user,pwd}],(data,msg)=>{
        //弹出提示信息
        alert(msg)
        //本地存储user
        localStorage.setItem('user',user)
      
        //跳路由 props.history
        push('/home')
    })))  
}

export default props => {
    
    const [user,setUser] = useState('');
    const [pwd,setPwd]   = useState('');
 
    return (
        <div className="login_out">
            <Input placeholder="请输入账号" value={user} onChange={ e =>setUser(e.target.value)} />
            <Input.Password  placeholder="请输入密码" value={pwd} onChange={ e =>setPwd(e.target.value)}/>
            <Button block onClick={()=>submit(user,pwd,props.history.push)}>提交</Button>
        </div>
        )
}




