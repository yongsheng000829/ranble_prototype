import React,{useState,useEffect} from 'react'
import {Input,Button,Tree} from 'antd'


export default props => {

    const {httpSuccess}  = React.Meili;
    const [role,setRole] = useState('')
    const [subMenu,setSubMenu] = useState([])
    const [oprArr,setOprArr]   = useState([])
    const[ treeData,setTreeData ] = useState([])
    const[ oprData,setOprData ]   = useState([])
    useEffect(()=>{
        httpSuccess(['get','/crm/rolemenu'],data => {
            setTreeData(data.data)
            setOprData(data.opr)
        })},[])

    //选中角色
    const onCheck = checkedKeys => {
        checkedKeys = checkedKeys.filter(item=>item.indexOf('sub')===-1)
        setSubMenu(checkedKeys)
    };
    const oprCheck = checkedKeys => {
       setOprArr(checkedKeys)
    };
    
    //数据提交
    const submit =()=> httpSuccess(['post','/crm/rolesubmit',{role,subMenu,oprArr}])
    
    return <div>
             <div className="add_out">
                <strong>角色名称:</strong>
                <Input value={role} type="text" style={{width:200}} onChange={ e =>setRole(e.target.value)}/></div>
            <div className="add_out"></div>
            <div className="m_t_15">
                <p>菜单权限</p>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={onCheck}
                    treeData={treeData}
                />
            </div>
            <div className="m_t_15">
                <p>操作权限</p>
                <Tree
                    checkable
                    onCheck={oprCheck}
                    treeData={oprData}
                />
            </div>
            <Button  className="m_t_15" onClick={()=>submit()}>提交</Button>
    </div>
}