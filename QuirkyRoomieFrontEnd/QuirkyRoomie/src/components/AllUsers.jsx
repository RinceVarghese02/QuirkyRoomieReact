import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Register from './Register'
import { Navigate, useNavigate } from 'react-router-dom'

const AllUsers = () => {

    const [allusers, setAllusers] = useState([])
    const [deleteduser, setDeletedusers] = useState(false)
    const navigate=useNavigate()

    useEffect(() => {
        try {
            axios.get('http://localhost:3000/allusers')
                .then((res) => {
                    // console.log(res.data.users)
                    setAllusers(res.data.users)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            res.send({ message: 'Something went Wrong', err: error })
        }
    },[deleteduser])
    // console.log('users',allusers)
    function deleteuser(id){
        // console.log(id)
        try {
            axios.get(`http://localhost:3000/deleteuser?id=${id}`,id)
                .then((res) => {
                    // console.log(res.data.deleted)
                    if(res.data.deleted===true){
                        setDeletedusers(!deleteduser)
                    }
                    
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            res.send({ message: 'Something went Wrong', err: error })
        }
    }

    return (

        <div className='min-h-screen w-full bg-zinc-900'>
            <div className='text-white p-7 text-2xl font-semibold bg-zinc-700 shadow-zinc-600 shadow-lg flex justify-around'>
            <h1 className='text-white text-2xl font-semibold'>All Complaints</h1>
            <button className='bg-blue-500 px-4 py-2 rounded-lg active:scale-[.96]' onClick={()=>{navigate('/')}}>Register</button>
            </div>
            <div className='p-7'>
            <h1 className='text-white text-2xl p-7 font-semibold'>All Users:</h1>
                {allusers.map((data, index) => {
                    return <div key={index} className='bg-zinc-800 rounded-xl mx-4 mt-4 text-zinc-300 p-7 text-xl font-semibold'>
                        <h1 className='text-blue-500'>{'User ' + (index + 1)}</h1>
                        <h1>Name: {data.name}</h1>
                        <h1>Email: {data.email}</h1>
                        <h1>Flat Code: {data.flatcode}</h1>
                        <h1 className='break-words'>Password: {data.password}</h1>
                        <button className='bg-green-500 px-4 py-2 rounded-lg mr-4 mt-4 active:scale-[.96]'>Edit</button>
                        <button className='bg-red-500 px-4 py-2 rounded-lg mr-4 mt-4 active:scale-[.96]' onClick={()=>{deleteuser(data._id)}} >Delete</button>
                    </div>
                })}
            </div>

        </div>
    )
}

export default AllUsers