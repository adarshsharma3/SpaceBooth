import React from "react";
import { useState } from "react";
import {login as storeLogin} from '../store/authSlice'
import {Input,Logo,Button} from './index'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

function Login(){
    const Navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const[error,SetError]=useState("")

   const login=async(data)=>{
     SetError("")    
    try{
        const session= await authService.login(data)
        if(session){
            const userData= await authService.getCurrentUser()
            if(userData) dispatch(storeLogin(userData));
            Navigate('/') //Check!!
        }
    }
catch(error){
    SetError("error.mesaage");
    console.log("login krte samey problem huii haii");
}
   }

return (

    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
<form onSubmit={handleSubmit(login)} className="mt-8">
<div className="space-y-5">
<Input label="Email:"
placeholder="Enter email"
type="email"
{...register("email",{    
    required: true 
    // validate: {
    //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    //     "Email address must be a valid address",
    // } 
    //  dont waana use Here
})}
/>

<Input label="Password:" 
placeholder="Enter password"
 type="password" 
 {...register("password",{   //Register is nothing but a methode given my react-form for handling states
    required: true
 })}/>
 <Button className="w-full" type="submit">Submit</Button>
</div>

</form>

</div>
</div>
)
}

export default Login