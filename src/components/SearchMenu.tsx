import { Command } from 'cmdk'
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Song } from '../../types'
import styles from "../styles/raycast.module.scss"
import { FaMusic } from 'react-icons/fa'
import usePlayer from '@/hooks/usePlayer'
import ItemList from './ItemList'

interface Props {
    allSong: Song[]
    setSongDescription: Dispatch<SetStateAction<Song | null>>
    songInfo: Song
}

const SearchMenu = ({ allSong, setSongDescription, songInfo }: Props) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const player = usePlayer()

  useEffect(() => {
    const down = (e: { key: string; metaKey: any; ctrlKey: any; preventDefault: () => void }) => {
      if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        player.audioSong?.pause()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [allSong, player.audioSong])
  

  return (
    <Command.Dialog value={search} onValueChange={setSearch} className={styles.cmdk} open={open} onOpenChange={setOpen} label="Global Command Menu">
      <Command.Input  style={{ borderRadius: "10px" }} />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Music">
          {allSong.map((song, i) => (
            <Command.Item key={i} >
              <FaMusic />
              {/* <div onClick={async () => await getSong(song)}>
                {song.artist} {song.title}
              </div> */}
              <ItemList setSongDescription={setSongDescription} song={song} setOpen={setOpen}/>
            </Command.Item>
          ))}
          <Command.Separator />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}

export default SearchMenu