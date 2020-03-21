import React from 'react'

export default Components => {
    return props => {
        if(!localStorage.user){
            props.history.push('/login')
            return null
        }
      
        // let res = localStorage.strUrl.indexOf(props.location.pathname)
        // if(res === -1){
        //     return <div>您没有访问权限嘻嘻</div> 
        // }
        return <Components {...props}/>
    }
}
