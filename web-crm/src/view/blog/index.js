import React,{useState,useEffect} from 'react'
import {Table,Tag,Input,Select,Button,Modal} from 'antd'
const {Option} = Select
const {confirm } = Modal

export default props =>{

    const {httpSuccess,transTimer} = React.Meili;
    const [list,setList] = useState([]);

    const columns = [

        {
          title: '游记标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '出行时间',
          dataIndex: 'time',
          key: 'time',
          render:value=>transTimer(value)
        },
        {
            title: '行程',
            dataIndex: 'day',
            key: 'day',
            render: (value,item) =>value+'天'+item.night+'夜'
        },
        {
            title: '标签',
            dataIndex: 'class',
            key: 'class',
            render:value=><Tag color="pink">{value}</Tag>
        },
        {
          title: '发布时间',
          dataIndex: 'subTime',
          key: 'subTime',
          render:value=>transTimer(value)
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          render: (id,item) =>(
            <div>
              <Tag onClick ={ () => props.history.push({pathname:'/home/blogdetail',state:{id}})}>预览</Tag>
              {item.status==='1'?null:<Tag color="blue">编辑</Tag>}
              <Tag color="blue" onClick={()=>upDown(id,item.status)}>
                {item.status==='1'?'下架':'发布'}
              </Tag>
            </div>
          )
      }
    ];

    let upDown = (id,code) =>{
      let txt    = code === '1'?'下架':'发布'
      let status = code === '1'?'2':'1'
      confirm({
        title: '系统提示',
        content: '确定要'+txt+'这篇游记吗',
        onOk() {
          httpSuccess(['put','/crm/bloghidden',{id,status}],data => setList(data))
        }
      });
      
    };

    useEffect(()=>{httpSuccess(['get','/crm/bloglist'],data => setList(data))},[])
    return <div>
            <div  style={{margin:'15px'}}>
              <Input type="text" placeholder="请输入关键字" style={{width:200}}/>
              <Select defaultValue="all" style={{width:200}}>
                <Option value="all">全部</Option>
                <Option value="1">上架</Option>
                <Option value="2">发布</Option>
              </Select>
              <Button>搜索</Button>
            </div>
            <div style={{margin:'15px'}}>
              <Tag color="orange" onClick={()=>props.history.push('/home/bookadd')}>添加游记</Tag>
            </div>
            <Table rowKey={item=>item.id} dataSource={list} columns={columns} style={{margin:'0 15px'}}/>;
    </div>
}