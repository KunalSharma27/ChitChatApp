import React from 'react'
import Sidebar from '../components/Sidebar'
import Chatbar from '../components/Chatbar'

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chatbar/>
      </div>
    </div>
  )
}

export default Home