/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from 'react'
import {useForm} from "react-hook-form";
import  Link from "next/link"
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from 'next/navigation';

export default function page() {
  const route=useRouter();
  const {handleSubmit,register} =useForm();
  
  const handleRegister=async(data:any)=>{
    const result =await axios.post('/api/users/signup',data);
    toast.success(result.data.message);
    route.push('/')
  }
  

  return (
    <div className='bgimg'> 
  <div className="container ">
    <div className="row login-signup-upper">
<form onSubmit={handleSubmit(handleRegister)}>
  <legend>Signup </legend>
       
       Name <input type="text" {...register("name")} className="mx-5 my-2"required={true}/><br></br>
       Email <input type="email" {...register("email")} className='mx-5 my-2' required={true}/><br></br>

       Password <input type="password" {...register("password")}  className=" mx-3 my-2"required={true}/><br></br>

       <button  className='mx-2 btn btn-primary'> Submit</button>
       <Link href="/" className='mx-3'>Login</Link>



<Toaster />
      </form>
    </div>
  </div>
      </div>
    
  )
}
