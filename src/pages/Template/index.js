import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components'

const Template = () => {
  return (
    <div className='bg-[#F8F9FB]'>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-[#F8F9FB]'>
            <div className='flex px-[30px] py-[35px] gap-[30px]'>
                <Sidebar/>
                <div className='w-full space-y-[24px] overflow-hidden mt-2'>
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Template