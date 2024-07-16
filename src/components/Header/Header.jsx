import React from 'react'
import {Container,Logo,LogoutButton} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
const authStatus=useSelector((state)=>{
  return state.auth.status;
})
const navigate=useNavigate()
const navItems = [
  {
    name: 'Home',
    slug: "/",
    active: true
  }, 
  {
    name: "Login",
    slug: "/login",
    active: !authStatus,
},
{
    name: "Signup",
    slug: "/signup",
    active: !authStatus,
},
{
    name: "All Posts",
    slug: "/all-posts",
    active: authStatus,
},
{
    name: "Add Post",
    slug: "/add-post",
    active: authStatus,
},
]

  return (
    <header className=' width-full shadow-lg bg-transparent border-spacing-8 border-white bg-opacity-50 '>
<Container>
<nav className='flex items-center justify-between w-full'>
  <div className='h-100px'>
    <Link to='/'>
    <Logo width='70px'/>
    </Link>
  </div>
<ul className='flex ml-auto space-x-3'>{navItems.map((item)=>
item.active ? (
  <li key={item.name}>
    <button
    onClick={() => navigate(item.slug)}
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    >{item.name}</button>
  </li>
):null
)}

{authStatus && (    
  <li>
    <LogoutButton/>
  </li>
)}
{/* new Syntax */}

</ul>


</nav>
</Container>
    </header>
  )
}

export default Header