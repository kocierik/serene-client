import { songContext } from '@/providers/songContext'
import React, { useContext } from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  const actualSong = useContext(songContext)

  return (
    //remember how the group works, we made in the group in the song item component so when the song item is hovered over this play button renders, then when the play button itself is hovered it scales up as well
    <button onClick={async ()=> await actualSong?.play()} className='transition opacity-0 rounded-full flex items-center bg-success p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'>
        <FaPlay className='text-black'/>
    </button>
  )
}

export default PlayButton