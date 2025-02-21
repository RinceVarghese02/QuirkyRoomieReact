import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Complaints from './components/Complaints'
import LeaderBoards from './components/LeaderBoards'
import NewComplaint from './components/NewComplaint'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/complaints' element={<Complaints/>} />
      <Route path='/newcomplaint' element={<NewComplaint/>} />
      <Route path='/leaderboards' element={<LeaderBoards/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App