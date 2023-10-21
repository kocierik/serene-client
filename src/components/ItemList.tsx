import React from 'react'
import { Song } from '../../types'
import UseGetSongByArtistTitle from '@/hooks/useGetSongByArtistTitle'
import usePlayer from '@/hooks/usePlayer'

interface Props{
    song: Song
    setSongDescription: React.Dispatch<React.SetStateAction<Song | null>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
} 

const ItemList = ({song, setSongDescription, setOpen}: Props) => {
    const player = usePlayer()

    const getSong = async (song: Song) => {
        if (song.id !== player.activeId) {
          player.audioSong?.pause()
          setSongDescription(song)
          const audioSong = await UseGetSongByArtistTitle(song.artist + song.title)
          player.setSong(audioSong)
          player.setIds([...player.ids, song])
          player.setIsPlaying(true)
          player.setId(player.ids.length)
          audioSong.play()
          setOpen(false)
        }
      }
      const handleKeyPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          await getSong(song);
        }
      }

    return (
    <div onKeyDown={handleKeyPress} tabIndex={0} onClick={async () => await getSong(song)}>
        {song.artist} {song.title}
  </div>
  )
}

export default ItemList