import { Command } from 'cmdk'
import React from 'react'
import { Song } from '../../types'
import styles from "../styles/raycast.module.scss"
interface Props {
    allSong: Song[]
}

const SearchMenu = ({allSong}: Props) => {
  const [open, setOpen] = React.useState(false)

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: { key: string; metaKey: any; ctrlKey: any; preventDefault: () => void }) => {
      if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog className={styles.cmdk} open={open} onOpenChange={setOpen} label="Global Command Menu">
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Letters">
            {allSong.map((song,i)=>{
                return (<Command.Item key={i}>{song.title}</Command.Item>)
            })}
          <Command.Separator />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}

export default SearchMenu