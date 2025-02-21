import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const NewComplaint = () => {

    const [complaints,setComplaints]=useState({});
    const navigate=useNavigate();
    function inputhandler(e){
        const {name,value}=e.target;
        setComplaints({...complaints,[name]:value});
    }
    // console.log(user)

    function submithandler(e){
        e.preventDefault();
        axios.post('http://localhost:3000/api/complaints',complaints)
            .then((res)=>{
                console.log(res);
                if (res) navigate('/complaints');
                
            }).catch((err)=>{
                console.log('error',err);
                
            })
    }

    return (
        <>
            <div className='w-full h-screen bg-zinc-900 flex justify-center items-center'>
                <form onSubmit={(e)=>{submithandler(e)}} className='text-white p-7 rounded-2xl flex-col gap-4 shadow-xl shadow-zinc-600 shadow-[10,10,10,10]'>
                    <h1 className='text-center text-4xl mb-5'>Write Your Complaint Here:</h1>
                    <h2 className='text-2xl mb-2'>Enter the Title:</h2>
                    <input type="text" name="title" onChange={(e)=>{inputhandler(e)}} placeholder='enter the title' className='bg-zinc-700 rounded-lg px-3 text-xl py-2 w-full mb-4' />
                    <h2 className='text-2xl mb-2'>Enter the description:</h2>
                    <input type="text" name="description" onChange={(e)=>{inputhandler(e)}} placeholder='enter the Description' className='bg-zinc-700 rounded-lg px-3 text-xl py-2 w-full mb-4' />
                    <h2 className='text-2xl mb-2'>Enter Your Complaint Type (Noise, Cleanliness, Bills, Pets, etc.):</h2>
                    <input type="text" name="type" onChange={(e)=>{inputhandler(e)}} placeholder='enter your complaint type (Noise, Cleanliness, Bills, Pets, etc.)' className='bg-zinc-700 rounded-lg px-3 text-xl py-2 w-full mb-4' />
                    <h2 className='text-2xl mb-2'>Enter Severity Level (Mild, Annoying, Major, Nuclear):</h2>
                    <input type="text" name="severity" onChange={(e)=>{inputhandler(e)}} placeholder='enter Severity Level (Mild, Annoying, Major, Nuclear):' className='bg-zinc-700 rounded-lg px-3 text-xl py-2 w-full mb-4' />
                    <button type="submit" className='active:scale-[.97] bg-green-400 px-5 py-2 rounded-lg w-full mt-3'>REGISTER</button>
                </form>

            </div>
        </>
    )
}

export default NewComplaint