import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import {Header,Footer} from './components/index'
import authService from './appwrite/auth'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css'
// import authSlice from './store/authSlice'

import videoFile from './Video/spaceVid.mp4'
const override= css`
display:block;
margin:0 auto;
`;

import './App.css'
import {login,logout} from './store/authSlice'
function App() {
const [loading,setLoading]=useState(true);
const location=useLocation()
const dispatch=useDispatch()
useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
   dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  })
  
  .catch((error)=>{
    console.log("Error in App.jsx while using get User" +error)
  })
  .finally(()=>{
   setLoading(false)
  })
  
},[])
    
return !loading?(
  <div className="w-full py-8 bg-cover bg-center transform ">
     <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z--100">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <div className='width-full block'> 
      {/* classname block :it takes the full width of parent iska lawa every block div or children 
      starts in a new line
      content between :start at top end at bottom
       */}
   
<div className='shadow-lg sticky top-0 z-50 '>
<Header />
</div>
     
  
    <main className="relative z-20">
    <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <div className="page">
                <Outlet />
              </div>
            </CSSTransition>
          </TransitionGroup>
      {/* Outlet todo */}
    </main>
    <Footer/>
    </div>
  </div>
):(
  <div className="flex justify-center items-center h-screen  ">
  <RingLoader color={'white'} css ={override} size={150} />
</div>
) 
}

export default App
