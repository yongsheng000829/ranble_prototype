import React from 'react'
import Home  from '@/view/home'
import Login from '@/view/login'
import Amazing from '@/view/amazing'
import Hight from '@/until/loginType'
import User from '@/view/user/index'
import Staff from '@/view/staff'
import staffAdd from '@/view/staff/add'
import staffLook from '@/view/staff/look'
import RoleList from '@/view/role/index'
import roleAdd from '@/view/role/add'
import Work from '@/view/work'
import BlogList from '@/view/blog/index'
import BlogAdd from '@/view/blog/add'
import BlogDetail from '@/view/blog/detail'
const routerConfig = [
    {
        path:'/home',
        component:Hight(Home),
        children:[
            {
                path:'/home/work',
                component:Work
            },
            {
                path:'/home/staff',
                component:Staff
            },
            {
                path:'/home/staffadd',
                component:staffAdd
            },
            {
                path:'/home/stafflook',
                component:staffLook
            },
            {
                path:'/home/user',
                component:Hight(User)
            },
            {
                path:'/home/amzinglist',
                component:Hight(Amazing)
            },
            {
                path:'/home/contact',
                component:()=><div>联系我们</div>
            },
            {
                path:'/home/rolelist',
                component:RoleList
            },
            {
                path:'/home/roleadd',
                component:roleAdd
            },
            {
                path:'/home/productlist',
                component:()=><div>产品列表</div>
            },
            {
                path:'/home/productadd',
                component:()=><div>添加产品</div>
            },
            {
                path:'/home/booklist',
                component:BlogList
            }, 
            {
                path:'/home/bookadd',
                component:BlogAdd
            },
            {
                path:'/home/blogdetail',
                component:BlogDetail
            },
            {
                to:'/home/work',
                from:'/home'
            }, 
              
        ]
    },
    {
        path:'/login',
        component:Login
    },
    {
        to:'/login',
        from:'/'
    }
]
export default routerConfig