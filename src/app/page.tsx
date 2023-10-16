'use client'

import PlayerContent from '@/components/PlayerContent'
import Sidebar from '@/components/Sidebar'
import SongItem from '@/components/SongItem'
import UseGetSongById from '@/hooks/useGetSongById'
import UseGetSongs from '@/hooks/useGetSongs'
import { useEffect, useState } from 'react'
import { Song } from '../../types'
import { songContext } from '@/providers/songContext'

export default function Home() {

  const [song, setSong] = useState<HTMLAudioElement>(new Audio(""))

  const [allSong, setAllSong] = useState<Song[]>([])

  const getAllSongs = async () => {
    const value : Song[] = await UseGetSongs()
    setAllSong(value.reverse())
  }

  useEffect(() => {
    getAllSongs()
    getSong()
  }, [])

  const getSong = async () => {
    const value = await UseGetSongById(5)
    const objectURL = URL.createObjectURL(value);
    const audioSong = new Audio(objectURL);
    setSong(audioSong)
  }
  return (
    <songContext.Provider value={song!}>
      <main className="flex min-h-screen	bg-base-300 flex-1  ">
        <Sidebar />
        <div className='w-full'>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
            {allSong?.length > 0 &&
              allSong?.map((songInfo, i) => {
                return <SongItem songInfo={songInfo} key={i} />
              })
            }
          </div>
          <div className='fixed bottom-0 bg-base-200 w-full py-2 h-[80px] px-4'>
            <PlayerContent />
          </div>
        </div>
      </main>
    </songContext.Provider>
  )
}
