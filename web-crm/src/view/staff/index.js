import React,{useState,useEffect} from 'react'
import {Table,Tag,Input,Select,Button,Modal} from 'antd'
const {Option} = Select
const {confirm } = Modal

export default props =>{

    const {httpSuccess,transTimer} = React.Meili;
    const [list,setList] = useState([]);

    const columns = [
        {
          title: '职员编号',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '职员姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          render:value=><div>{value==='1'?'男':'女'}</div>
        },
        {
            title: '入职日期',
            dataIndex: 'time',
            key: 'time',
            render: value =>transTimer(value)
        },
        {
            title: '是否在职',
            dataIndex: 'status',
            key: 'status',
            render:value=><div>{value==='1'?'在职':'离职'}</div>
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          render: (id,item) =>(
            <div>
              <Tag onClick ={ () => props.history.push({pathname:'/home/stafflook',state:{id}})}>查看</Tag>
              {
                item.status==='1'?
                <span><Tag color="blue">编辑</Tag>
                <Tag color="magenta" onClick={()=>leave(id)}>离职</Tag></span>:null
              }
            </div>
          )
      }
    ];

    let leave = id =>{
      confirm({
        title: '系统提示',
        content: '确定要对该职员进行离职操作吗',
        onOk() {
          httpSuccess(['put','/crm/staffupdate',{id}],data => setList(data))
        }
      });
      
    };

    useEffect(()=>{httpSuccess(['get','/crm/stafflist'],data => setList(data))},[])
    return <div>
            <div style={{margin:'15px'}}>
              <Input type="text" placeholder="职员姓名" style={{width:200}}/>
              <Select defaultValue="all" style={{width:200}}>
                <Option value="all">全部</Option>
                <Option value="1">在职</Option>
                <Option value="2">离职</Option>
              </Select>
              <Button>搜索</Button>
            </div>
            <div style={{margin:'15px'}}>
              <Tag color="orange" onClick={()=>props.history.push('/home/staffadd')}>添加职员</Tag>
            </div>
            <Table rowKey={item=>item.id} dataSource={list} columns={columns} style={{margin:'0 15px'}}/>;
    </div>
}