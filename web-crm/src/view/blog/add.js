import React,{useState,useEffect,useRef} from 'react'

import wangEdtior from 'wangeditor'
import {Input,Select,Button,DatePicker} from 'antd'
import moment from 'moment';
const {Option} = Select;
export default props => {

    const {httpSuccess,nowDateStr} = React.Meili;
    
    const [title,setTitle]   = useState('');
    const [time,setTime]     = useState(nowDateStr());
    const [day,setDay]       = useState('')
    const [night,setNight]   = useState('')
    const [pay,setPay]       = useState('')
    const [person,setPerson] = useState('')
    const [type,setType]     = useState('')

    const eidtorDom          = useRef()
    
    const [Editor,setEditor] = useState(null)

    useEffect(()=>{
        let abc = new wangEdtior(eidtorDom.current);
        abc.create();
        setEditor(abc)
    },[])

    const submit = ()=> {
        console.log(title,time,day,night,pay,person,type,Editor.txt.html())
    }

    return <div className="staff_add">

    <div className="add_out">
        <strong>标题:</strong>
        <Input value={title} type="text" style={{width:400}} onChange={ e =>setTitle(e.target.value)}/>
    </div>
    <div className="add_out">
        <strong>类别:</strong>
        <Input value={type} type="text" style={{width:400}} onChange={ e =>setType(e.target.value)}/>
    </div>
    <div>
        <strong>游记内容:</strong>
        <div ref={eidtorDom}></div>
    </div>  
    <div className="add_out">
        <strong>人数:</strong>
        <Input value={person} type="text" style={{width:400}} onChange={ e =>setPerson(e.target.value)}/>
    </div>

    <div className="add_out">
        <strong>花费:</strong>
        <Input value={pay} type="text" style={{width:400}} onChange={ e =>setPay(e.target.value)}/>
    </div>
    <div className="add_out">
        <strong>出行日期:</strong>
        <DatePicker value={moment(time,'YYYY/MM/DD')} format="YYYY/MM/DD" onChange={(date, dateString) => setTime(dateString)} style={{width:200}}/>
    </div>
    <div className="add_out">
        <strong>行程:</strong>
        <Select value={day} style={{width:100}} onChange={value=>setDay(value)}>
            {
                //Array.from(new Array(9),(item,index)=>index+1)
                [1,2,3].map(item=><Option key={item} value={item}>{item}天</Option>)
            }
        </Select>
        <Select value={night} style={{width:100}} onChange={value=>setNight(value)}>
            {
                //Array.from(new Array(8).keys())
                [1,2].map(item=><Option key={item}  value={item+1}>{item+1}晚</Option>)
            }
        </Select>
    </div>
       
    <Button onClick={()=>submit()} className="m_t_30">提交</Button>
</div> 

}