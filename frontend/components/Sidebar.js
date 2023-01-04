import React from 'react'
import {InboxIcon, CalendarIcon,CalendarDaysIcon, CubeTransparentIcon} from '@heroicons/react/24/outline'

function Sidebar() {
  return (
    <main className='w-[305px] bg-gray-50 shadow-md py-6 col-span-3'>
        <section className='px-4 space-y-3'>
            <div className='flex hover:bg-gray-200 justify-between items-center px-4 py-1 cursor-pointer'>
               <div className='flex items-center space-x-2'>
               <InboxIcon className='h-6 w-6 text-blue-500'/>
                <p className='text-sm text-lighter text-gray-700'>Inbox</p>
               </div>
               <p className='text-xs text-gray-400'>9</p>
            </div>

            <div className='flex hover:bg-gray-200 justify-between items-center px-4 py-1 cursor-pointer'>
               <div className='flex items-center space-x-2'>
               <CalendarIcon className='h-6 w-6 text-green-500'/>
                <p className='text-sm text-lighter text-gray-700'>Today</p>
               </div>
               <p className='text-xs text-gray-400'>9</p>
            </div>
            <div className='flex hover:bg-gray-200 justify-between items-center px-4 py-1 cursor-pointer'>
               <div className='flex items-center space-x-2'>
               <CalendarDaysIcon className='h-6 w-6 text-purple-500'/>
                <p className='text-sm text-lighter text-gray-700'>Upcoming</p>
               </div>
            </div>
            <div className='flex hover:bg-gray-200 justify-between items-center px-4 py-1 cursor-pointer'>
               <div className='flex items-center space-x-2'>
               <CubeTransparentIcon className='h-6 w-6 text-orange-500'/>
                <p className='text-sm text-lighter text-gray-700'>Filters & Labels</p>
               </div>
            </div>
        </section>
    </main>
  )
}

export default Sidebar