'use client'

import { Song } from '@/interface/song'
import Image from "next/image"
import PlayButton from "./PlayButton"
import { Dispatch, SetStateAction, useState } from "react"
import usePlayer from "@/hooks/usePlayer"
import UseGetSongByArtistTitle from "@/hooks/useGetSongByArtistTitle"
import SettingButton from "./SettingButton"
import UseDownloadSong from "@/hooks/useDownloadSong"
import { formatDuration } from '@/utils/secondToTime'

interface Props {
  songInfo: Song
  setSongDescription: Dispatch<SetStateAction<Song | null>>
  fromYt: boolean
}

const SongItem = ({ songInfo, setSongDescription, fromYt }: Props) => {
  const player = usePlayer()
  const [isLoading,setIsLoading] = useState(false)
  
  const getSong = async () => {
    if(songInfo.id != player.activeId){
      player.audioSong?.pause()
      setSongDescription(songInfo)
      const audioSong = await UseGetSongByArtistTitle(songInfo.title)
      player.setSong(audioSong)
      player.setIds([...player.ids,songInfo])
      player.setIsPlaying(true)
      player.setId(player.ids.length)
      audioSong.play()
    } else if(!player.isPlaying){
      player.audioSong?.play()
      player.setIsPlaying(true)
    } else {
      player.audioSong?.pause()
      player.setIsPlaying(false)
    }
    setIsLoading(false)
  }

  const downloadSong = async (url: string) =>{
    setIsLoading(true)
    await UseDownloadSong(url)
  }

  return (
    <div onClick={async () => { if(fromYt) await downloadSong(songInfo.path!);  await getSong(); }} className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-base-300 cursor-pointer hover:bg-neutral-300/10 transition p-3'>
      <div className="relative flex items-center justify-center aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" sizes={"320"} src={songInfo.picture?.length! > 100 ? 'data:image/jpeg;base64,' + songInfo.picture :  songInfo.picture!} alt='cover' fill />
        {isLoading && <span className="loading loading-spinner loading text-primary w-20"></span>}
      </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
          <p className="font-semibold truncate w-full">{songInfo?.title}</p>
          <p className="text-neutral-400 text-sm pb-4 w-full truncate flex justify-between">
            <span>{songInfo?.artist}</span> 
            <span className='text-right'>{formatDuration(songInfo?.duration!)}</span>
          </p>
          <p className="text-neutral-400 text-sm pb-4 w-full truncate"></p>
        </div>
      <div className="absolute bottom-24 right-5 flex flex-col gap-2 justify-center items-center">
        <div>
          <SettingButton />
        </div>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
