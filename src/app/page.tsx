'use client'

import PlayerContent from '@/components/PlayerContent'
import Sidebar from '@/components/Sidebar'
import SongItem from '@/components/SongItem'
import UseGetSongs from '@/hooks/useGetSongs'
import { useEffect, useCallback, useState } from 'react'
import { Song } from '../../types'
import usePlayer from '@/hooks/usePlayer'

export default function Home() {
  const [songDescription,setSongDescription] = useState<Song | null>(null)
  const [allSong, setAllSong] = useState<Song[]>([])
  
  const getAllSongs = useCallback(async () => {
    const value : Song[] = await UseGetSongs()
    setAllSong(value.reverse())
  },[])

  useEffect(() => {
    getAllSongs()
  }, [])

  return (
      <main className="flex min-h-screen	bg-base-300 flex-1  ">
        <Sidebar />
        <div className='w-full'>
          <div className="grid p-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
            {allSong?.length > 0 &&
              allSong?.map((songInfo, i) => {
                return <SongItem songInfo={songInfo} setSongDescription={setSongDescription}  key={i} />
              })
            }
          </div>
          <div className='sticky bottom-0 bg-base-200  py-2 h-[80px] px-4 '>
            <PlayerContent allSong={allSong} songDescription={songDescription} setSongDescription={setSongDescription} />
          </div>
        </div>
      </main>
  )
}