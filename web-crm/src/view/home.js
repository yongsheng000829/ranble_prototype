import React,{useState,useEffect,useRef} from 'react'
import { Layout, Menu,Modal,Input } from 'antd';

const { Header, Content, Sider } = Layout;
const { SubMenu }    = Menu;

export default props => {

    const {httpSuccess} = React.Meili
  
    const [list,setList] = useState([]);
    const [visible,setVisible] = useState(false);
    const [collapsed,setCollapsed] = useState(false);
    const oldPwd = useRef();
    const newPwd = useRef();
    const surePwd = useRef();
    //菜单请求
    useEffect(()=>{
      httpSuccess(['get','/crm/homemenu'],data => setList(data))
    },[])

    //退出登录
    let loginOut = ()=> {
      localStorage.clear();
      httpSuccess(['get','/login/out'],(data,msg)=>{
        alert(msg)
        props.history.push('/login')
      })  
    }
    //修改密码
    let changePwd = () =>{
        let subData = {
          old:oldPwd.current.input.value,
          news:newPwd.current.input.value,
          sure:surePwd.current.input.value
        }

        if(subData.news!==subData.sure){
            alert('您设置的新密码不一致')
            return
        }
        httpSuccess(['post','/change/pwd',subData],(data,msg)=>{
          setVisible(false)
          alert(msg)
          props.history.push('/login')
        })   
    }
   
    return <Layout style={{ minHeight: '100vh' }}>
            {/* 左导航 */}
            <Sider collapsible collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)}>
              <div className="home_work" onClick={()=>props.history.push('/home/work')}>工作台</div>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {/* 菜单输出模板 list数据在这渲染 */}
              {
                list.map( (item,index)=>{
                  return <SubMenu key={['sub',index+1].join('')} title={<span>{item.class}</span>}>
                        {
                          item.sub.map(jtem=>{
                            return <Menu.Item key={jtem.key} 
                                onClick={()=>props.history.push(jtem.to)}>
                                  {jtem.title}
                          </Menu.Item> 
                          })  
                        } 
                  </SubMenu>
               })
              }
              </Menu>
            </Sider>

            {/* 右边 */}
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                  <div className="user_message">{localStorage.user}丨<span onClick={()=>setVisible(true)}>修改密码</span>丨<span onClick={()=>loginOut()}>退出</span></div>
                  {/* 修改密码对话框 */}
                  <Modal
                    title="修改密码"
                    visible={visible}
                    onOk={changePwd}
                    onCancel={()=>setVisible(false)}
                  >
                   <p>旧密码: <Input.Password ref={oldPwd} placeholder="请输入旧密码" style={{width:200}}/></p>
                   <p>新密码: <Input.Password ref={newPwd} placeholder="请输入新密码"  style={{width:200}}/></p>
                   <p>确认密码:<Input.Password ref={surePwd} placeholder="请再次输入新密码"  style={{width:200}}/></p>
                  </Modal>
              </Header>
              <Content style={{ margin: '15px' }}>
                  <React.Meili.RouterView routers={props.routers}/>
              </Content>
            </Layout>
            
        </Layout>
}



