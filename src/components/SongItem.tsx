'use client'

import { Song } from "../../types"
import Image from "next/image"
import PlayButton from "./PlayButton"
import testImage from "../assets/logo.png"
import { songContext } from "@/providers/songContext"
import { Dispatch, SetStateAction, useContext } from "react"
import UseGetSongById from "@/hooks/useGetSongById"

interface Props {
  songInfo: Song
  setSongDescription: Dispatch<SetStateAction<Song | null>>
}



const SongItem = ({ songInfo, setSongDescription }: Props) => {

  const {song, setSong } = useContext(songContext)

  const getSong = async () => {

    setSongDescription(songInfo)
    const value = await UseGetSongById(songInfo.id)
    const objectURL = URL.createObjectURL(value);
    const audioSong = new Audio(objectURL);
    setSong(audioSong)
    await audioSong.play()
  }
  
  return (
    <div onClick={async () => { await getSong(); }} className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-200/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'>
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={songInfo.picture ? 'data:image/jpeg;base64,' + songInfo.picture :  testImage} alt='cover' fill />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{songInfo?.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">{songInfo?.artist}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
