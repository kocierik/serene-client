'use client'
import React, { useMemo } from 'react'
import {usePathname} from 'next/navigation'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'


const Sidebar = () => {
    const pathname=usePathname();
    const routes = useMemo(()=>[
        {
            icon: HiHome,
            label:'Home',
            active:pathname !== '/search',
            href:'/'
        },{
            icon: BiSearch,
            label:'Search',
            active:pathname === '/search',
            href:'/search'
        }
    ],[pathname])

    return (
        <div className='flex flex-col '>
            <div className='hidden md:flex flex-1  flex-col gap-y-2 bg-base-200  w-[300px] p-2'> {/*on med devices its flex mobile its hidden*/}
                <Box>
                    <div className='flex flex-col gap-y-4 px-5 py-4'>
                        {routes.map((item)=>(
                            <SidebarItem key={item.label} {...item}/> //spreading the rest of the props
                        ))}
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library />
                </Box>        
            </div> 
        </div>
    )
}

export default Sidebar