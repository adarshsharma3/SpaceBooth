import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
function LogoutButton() {
        const dispatch = useDispatch();
        const LogoutHandle=()=>{  //Alert!!
            authService.logout()
            .then(()=>{
                dispatch(logout())
            })
            .catch((error)=>{
                console.log("Logout Button me problem hai"+error);
            })
        }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={LogoutHandle}
    >Logout</button>
  )
}

export default LogoutButton