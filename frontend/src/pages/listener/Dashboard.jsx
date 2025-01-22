import React from 'react'
import SideBar from '../../components/Dashboard/SideBar'

const Dashboard = () => {
  return (
    <div className='h-screen grid grid-cols-[1fr_3fr_1fr] gap-4'>
      <SideBar/>
    </div>
  )
}

export default Dashboard