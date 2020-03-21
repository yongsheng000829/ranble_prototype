import React,{useState,useEffect} from 'react'
import {Table,Tag} from 'antd'
export default props =>{
   
    const {httpSuccess} = React.Meili;

    const [list,setList] = useState([]);
    const columns = [
        {
          title: '姓名',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title:'操作',
            dataIndex:'id',
            key:'id',
            render: value => <Tag onClick={()=>joinBlack(value)}>加入黑名单</Tag>            
        }
    ];
    useEffect(()=>{
      httpSuccess(['get','/crm/userlist'],data => setList(data))
    },[])

    let joinBlack = id =>{
        httpSuccess(['put','/crm/userblack',{id}],data => setList(data))
    }
    return <div>
            <Table rowKey={i=>i.id} dataSource={list} columns={columns} />;
    </div>
}