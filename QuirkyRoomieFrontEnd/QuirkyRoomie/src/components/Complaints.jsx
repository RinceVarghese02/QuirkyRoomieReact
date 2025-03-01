import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Complaints = () => {
    const navigate=useNavigate()
    const [allcomplaints,setallcomplaints]=useState([])
    const [complaintresolved, setcomplaintresolved] = useState(false)

    function openleaderboards(){
        navigate('/leaderboards')
    }
    function opennewcomplaint(){
        navigate('/newcomplaint')
    }
    function openlogin(){
        navigate('/login')
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/api/complaints')
        .then((res)=>{
            // console.log(res.data.allcomplaints)
            setallcomplaints(res.data.allcomplaints)
        })
        .catch((err)=>{
            console.log(err,'error')
        })
    },[])
    useEffect(()=>{
        axios.get('http://localhost:3000/api/complaints')
        .then((res)=>{
            // console.log(res.data.allcomplaints)
            setallcomplaints(res.data.allcomplaints)
        })
        .catch((err)=>{
            console.log(err,'error')
        })
    },[complaintresolved])
    console.log(allcomplaints)

    
    async function resolve(id){
           await axios.get(`http://localhost:3000/api/resolve?id=${id}`,id)
           .then((res)=>{
            console.log('resolved',res.data.success)
            if(res.data.success==true){
                setcomplaintresolved(!complaintresolved)
            }
            else{
                console.log('unsucessful')
            }
           })
           .catch((err)=>{
            console.log('something went wrong')
           })
        }

  return (
    <>
    <div className='w-full h-full bg-zinc-900'>
        <nav className='flex bg-zinc-700 text-zinc-300 font-bold text-xl gap-4 justify-around h-[80px] items-center shadow-lg shadow-zinc-600 '>
            <h1 className='cursor-pointer hover:text-red-400 active:scale-[.96] text-red-300' onClick={opennewcomplaint}>Raise a New Complaint</h1>
            <h1 className='cursor-pointer hover:text-zinc-100 active:scale-[.96]' onClick={openleaderboards}>LeaderBoards</h1>
            <button className='bg-red-500 px-4 py-2 rounded-lg active:scale-[.96]' onClick={openlogin}>Logout</button>
        </nav>
        <div className='text-white p-7 text-2xl font-semibold h-full'>
            <h1 className='mb-5'>All the Active Complaints :</h1>
            {allcomplaints.length?<h1>{allcomplaints.map((comp,index)=>{
            
            return <div key={index} className='bg-zinc-800 p-6 mb-7 rounded-xl'>
                 <h1>Complaint - {index+1}</h1>
                 <h1>Title:</h1>
                 <h2 className='bg-zinc-900 py-2 px-3 rounded-lg'>{comp.title}</h2>
                 <h2>Description: </h2>
                 <h2 className='bg-zinc-900 py-2 px-3 rounded-lg'>{comp.description}</h2>
                 <h2>Complaint Type (Noise, Cleanliness, Bills, Pets, etc.): </h2>
                 <h2 className='bg-zinc-900 py-2 px-3 rounded-lg'>{comp.type}</h2>
                 <h2>Severity Level (Mild, Annoying, Major, Nuclear): </h2>
                 <h2 className='bg-zinc-900 py-2 px-3 rounded-lg'>{comp.severity}</h2>
                 <h2>Timestamp: {comp.createdAt}</h2>
                 <button className='bg-green-500 px-4 py-2 rounded-lg mr-4 mt-4 active:scale-[.96]'>UpVote</button>
                 <button className='bg-red-500 px-4 py-2 rounded-lg mr-4 mt-4 active:scale-[.96]'>DownVote</button>
                 <button className='bg-blue-500 px-4 py-2 rounded-lg mr-4 mt-4 active:scale-[.96]'onClick={()=>resolve(comp._id)} >Resolve</button>
             </div>
             })}</h1>:<h2 className='bg-zinc-800 text-center p-2 rounded-xl'>No Complaints Yet</h2>}
            
        </div>
    </div>
    </>
  )
}

export default Complaints