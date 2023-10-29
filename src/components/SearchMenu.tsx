import { Command } from 'cmdk';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Song } from '@/interface/song';
import styles from '../styles/raycast.module.scss';
import { FaMusic } from 'react-icons/fa';
import usePlayer from '@/hooks/usePlayer';
import { IYouTubeVideo } from '@/interface/youtubeVideo';
import UseGetSongByArtistTitle from '@/hooks/useGetSongByArtistTitle';
import { GET_SEARCH_SONG_YT_URL } from '@/utils/const';

interface Props {
  allSong: Song[];
  setSongDescription: Dispatch<SetStateAction<Song | null>>;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuOpen: boolean;
  setYtSearch: Dispatch<SetStateAction<Song[] | undefined>>;
}

const SearchMenu = ({ setYtSearch, allSong, setSongDescription, setMenuOpen, menuOpen }: Props) => {
  const [search, setSearch] = useState('');
  const player = usePlayer();

  useEffect(() => {
    const down = (e: {
      key: string;
      metaKey: boolean;
      ctrlKey: boolean;
      preventDefault: () => void;
    }) => {
      if ((e.key === 'm' && (e.metaKey || e.ctrlKey)) || e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen((menuOpen) => !menuOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, [allSong, player.audioSong, setMenuOpen]);

  const findYtSong = async (query: string) => {
    const response = await fetch(`${GET_SEARCH_SONG_YT_URL}${query}`);
    const results: IYouTubeVideo[] = (await response.json()).items;
    console.log(results);
    const searchVideoResult: Song[] = [];
    results.map((item) => {
      const value: Song = {
        path: item.id.videoId,
        artist: query,
        picture: item.snippet.thumbnails.medium.url,
        title: item.snippet.title,
        duration: item.snippet.duration,
      };
      searchVideoResult.push(value);
    });
    setYtSearch(searchVideoResult);
    setMenuOpen(false);
  };
  const playSong = async (song: Song) => {
    if (song.id !== player.activeId) {
      player.audioSong?.pause();
      setSongDescription(song);
      const audioSong = await UseGetSongByArtistTitle(song.title);
      player.setSong(audioSong);
      player.setIds([...player.ids, song]);
      player.setIsPlaying(true);
      player.setId(player.ids.length);
      audioSong.play();
      setMenuOpen(false);
    }
  };

  return (
    <Command.Dialog
      loop
      className={styles.cmdk}
      open={menuOpen}
      onOpenChange={setMenuOpen}
      label="Global Command Menu"
    >
      <Command.Input value={search} onValueChange={setSearch} style={{ borderRadius: '10px' }} />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <div
          className="btn hover:bg-base-100 ml-2 mt-1"
          tabIndex={0}
          onClick={async () => await findYtSong(encodeURIComponent(search.replaceAll(' ', '_')))}
        >
          {' '}
          Search on Youtube
        </div>
        <Command.Group heading="Music">
          {allSong.map((song, i) => (
            <Command.Item key={i} onSelect={async () => await playSong(song)}>
              <FaMusic />
              {song.artist} {song.title}
            </Command.Item>
          ))}
          <Command.Separator />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};

export default SearchMenu;
