'use client'

import PlayerContent from '@/components/PlayerContent'
import Sidebar from '@/components/Sidebar'
import SongItem from '@/components/SongItem'
import UseGetSongs from '@/hooks/useGetSongs'
import { useEffect, useCallback, useState } from 'react'
import { Song } from '../../types'
import SearchMenu from '@/components/SearchMenu'

export default function Home() {
  const [songDescription,setSongDescription] = useState<Song | null>(null)
  const [allSong, setAllSong] = useState<Song[]>([])
  
  const getAllSongs = useCallback(async () => {
    const value : Song[] = await UseGetSongs()
    setAllSong(value.reverse())
  },[])

  useEffect(() => {
    getAllSongs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <main className="flex min-h-screen flex-col	bg-base-200 flex-1  ">
        
        <div className='flex'>
        <SearchMenu allSong={allSong} setSongDescription={setSongDescription} songInfo={songDescription!}/>
          <div className='flex flex-1'>
            <Sidebar />
          </div>
          <div className='w-full bg-base-100'>
            <div className="grid p-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
              {allSong?.length > 0 &&
                allSong?.map((songInfo, i) => {
                  return <SongItem songInfo={songInfo} setSongDescription={setSongDescription}  key={i} />
                })
              }
            </div>
          </div>
        </div>

          <div className='sticky bottom-0 bg-base-100  py-2 h-[80px] px-4 '>
            <PlayerContent allSong={allSong} songDescription={songDescription} setSongDescription={setSongDescription} />
          </div>
      </main>
  )
}