import React,{useState,useEffect} from 'react'
import {Table,Tag} from 'antd'
export default props =>{

    const {httpSuccess} = React.Meili;

    const [list,setList] = useState([]);
    const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '角色名称',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: '操作',
          render:()=>(
                <Tag>禁用</Tag>
          )
          
        },
    ];
    useEffect(()=>{
      httpSuccess(['get','/crm/rolelist'],data => setList(data))
      
    },[])
    return <div>
            <Table rowKey={item=>item.id} dataSource={list} columns={columns} />;
    </div>
}