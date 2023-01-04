import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TodoPage from '../components/TodoPage'

function HomePage() {
  return (
    <main>
        <Navbar/>
        <div className='grid grid-cols-12 h-[90vh]'>
        <Sidebar/>
        <TodoPage/>
        </div>
    </main>
  )
}

export default HomePage