import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';

const Login = () => {

    const navigate=useNavigate();
    const [user, setUser] = useState({})
    const {storeTokenInLs}=useAuth()

    function submithandler(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/api/auth/login',user)
        .then((res)=>{
            // console.log(res.data.token)
            if(res.data.success){
                navigate('/complaints')
            }
            else{
                console.log('Error')
            }
            storeTokenInLs(res.data.token)
        })
        .catch((err)=>{
            console.log(err,'err')
        })
    }
    function inputhandler(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        
    }
    function openregister(){
        navigate('/')
    }

    return (
        <>
            <div className='w-full h-screen bg-zinc-900 flex justify-center items-center'>
                <form onSubmit={(e) => { submithandler(e) }} className='text-white p-7 rounded-2xl flex-col gap-4 shadow-xl shadow-zinc-600 shadow-[10,10,10,10]'>
                    <h1 className='text-center text-4xl'>Login to Your Account!</h1>
                    <h2 className='text-lg text-center mb-6 cursor-pointer text-blue-500 font-semibold' onClick={openregister}>or Register</h2>
                    <h2 className='text-2xl'>Enter Your Email:</h2>
                    <input onChange={(e) => { inputhandler(e) }} type="text" name="email" placeholder='enter your email' className='bg-zinc-700 rounded-lg px-3 text-xl py-2 w-full mb-4' />
                    <h2 className='text-2xl'>Enter Your Password:</h2>
                    <input onChange={(e) => { inputhandler(e) }} type="text" name="password" placeholder='enter your password' className='bg-zinc-700 rounded-lg px-3 text-xl py-2 w-full mb-4' />
                    <button type="submit" className='active:scale-[.97] bg-green-400 px-5 py-2 rounded-lg w-full mt-3'>LOGIN</button>
                </form>

            </div>
        </>
    )
}

export default Login