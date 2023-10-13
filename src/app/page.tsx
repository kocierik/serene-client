'use client'

import PlayerContent from '@/components/PlayerContent'
import Sidebar from '@/components/Sidebar'
import SongItem from '@/components/SongItem'
import useGetSongById from '@/hooks/useGetSongById'
import { useEffect } from 'react'

export default function Home() {
  const value = useGetSongById("5")

  useEffect(() => {
    console.log(value)
  },[value])

  return (
    <main  className="flex min-h-screen	bg-base-300 flex-1  ">
      <Sidebar />
        <div className='w-full p-4'>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
              <SongItem />
              <SongItem />
              <SongItem />
            </div>
            <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
            <PlayerContent song={null} songUrl={''}/>
            </div>
          </div>

    </main>
  )
}
