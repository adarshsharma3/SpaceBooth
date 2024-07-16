import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';

const override= css`
display:block;
mardin:0 auto;
`;


export default function Protected({children,authentication=true}){

const navigate=useNavigate()
const [loader,setLoader]=useState(true)
const authStatus= useSelector(state=>state.auth.status)

useEffect(()=>{
if(authentication && authStatus!==authentication){
    navigate("/login")
}
else if( !authentication && authStatus!==authentication){
    navigate("/")
}
setLoader(false)
},[authStatus,navigate,authentication])

return loader? <RingLoader color={'gray'} css={override} size={150} /> : <>{children}</>
}
