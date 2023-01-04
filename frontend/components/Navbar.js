import React from 'react'
import{Bars3Icon, HomeIcon, MagnifyingGlassIcon, PlusIcon,ClockIcon, QuestionMarkCircleIcon, BellIcon} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { signOut,useSession } from 'next-auth/react'
function Navbar() {
  const { data: session } = useSession()

  const getUsername = (email) => {
    return email.slice("@")[0]
  }
  return (
    <main className='h-12 bg-red-600 w-full flex items-center justify-between px-6 sticky top-0 z-50'>
        <section className='flex items-center space-x-3 text-white'> 
            <Bars3Icon className='h-5 w-5 cursor-pointer hover:scale-105'/>
            <HomeIcon className='h-5 w-5 cursor-pointer'/>
            <div className='flex group transition-all duration-300 ease-out items-center border px-2 rounded-md space-x-2 hover:bg-gray-100 hover:text-black active:text-black'>
                <MagnifyingGlassIcon className="h-5 w-5"/>
                <input type="text" className='outline-none group-hover:placeholder:text-gray-700 placeholder:text-sm placeholder:text-gray-200  bg-transparent' placeholder='Search' />
            </div>
        </section>


        <section className='flex space-x-4 text-white items-center'>
        <PlusIcon className='h-5 w-5 cursor-pointer'/>
        <ClockIcon className='h-5 w-5 cursor-pointer'/>
        <QuestionMarkCircleIcon className='h-5 w-5 cursor-pointer'/>
        <BellIcon className='h-5 w-5 cursor-pointer'/>
        <div onClick={()=>signOut()} className='h-7 w-7 relative'>
        <Image className='cursor-pointer object-cover bg-white rounded-full' layout='fill' src={`https://avatars.dicebear.com/api/adventurer/:${getUsername(session.user.email)}.svg`}/>
        </div>
        </section>
    </main>
  )
}

export default Navbar