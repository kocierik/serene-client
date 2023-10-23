import { Command } from 'cmdk'
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Song } from '../../types'
import styles from "../styles/raycast.module.scss"
import { FaMusic } from 'react-icons/fa'
import usePlayer from '@/hooks/usePlayer'
import ItemList from './ItemList'
import { IYouTubeVideo } from '@/app/page'

interface Props {
    allSong: Song[]
    setSongDescription: Dispatch<SetStateAction<Song | null>>
    setMenuOpen: Dispatch<SetStateAction<boolean>>
    menuOpen: boolean
    setYtSearch: Dispatch<SetStateAction<Song[] | undefined>>
    ytSearch: Song[]
}

const SearchMenu = ({ ytSearch, setYtSearch, allSong, setSongDescription, setMenuOpen, menuOpen }: Props) => {
  const [search, setSearch] = useState('')
  const player = usePlayer()

  useEffect(() => {
    const down = (e: { key: string; metaKey: any; ctrlKey: any; preventDefault: () => void }) => {
      if ((e.key === 'm' && (e.metaKey || e.ctrlKey)) || e.key === 'Escape' ) {
        e.preventDefault()
        setMenuOpen((menuOpen) => !menuOpen)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        player.audioSong?.pause()
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [allSong, player.audioSong, setMenuOpen])

  const findYtSong = async (query: string) =>{
    const response = await fetch(`http://localhost:4000/search?query=${query}`)
    const results: IYouTubeVideo[] = (await response.json()).items
    let searchVideoResult : Song[] = []
    results.map(item => {
      console.log(item)
      const value : Song = {
        path: item.id.videoId,
        artist: query,
        picture: item.snippet.thumbnails.medium.url,
        title: item.snippet.title
      }
      searchVideoResult.push(value)
    })
    setYtSearch(searchVideoResult)
    setMenuOpen(false)
  }

  return (
    <Command.Dialog  className={styles.cmdk} open={menuOpen} onOpenChange={setMenuOpen} label="Global Command Menu">
      <Command.Input value={search} onValueChange={setSearch}  style={{ borderRadius: "10px" }} />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <div className='btn hover:bg-base-100 ml-2 mt-1' tabIndex={0} onClick={async () =>await findYtSong(encodeURIComponent(search.replaceAll(' ', '_')))}> Search on Youtube</div>
        <Command.Group heading="Music">
          {allSong.map((song, i) => (
            <Command.Item key={i} >
              <FaMusic />
              {/* <div onClick={async () => await getSong(song)}>
                {song.artist} {song.title}
              </div> */}
              <ItemList setSongDescription={setSongDescription} song={song} setMenuOpen={setMenuOpen}/>
            </Command.Item>
          ))}
          <Command.Separator />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}

export default SearchMenu