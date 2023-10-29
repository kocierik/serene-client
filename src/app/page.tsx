'use client';

import React from 'react';
import PlayerContent from '@/components/PlayerContent';
import Sidebar from '@/components/Sidebar';
import SongItem from '@/components/SongItem';
import UseGetSongs from '@/hooks/useGetSongs';
import { useEffect, useCallback, useState, useMemo } from 'react';
import { Song } from '@/interface/song';
import SearchMenu from '@/components/SearchMenu';
import SidebarItem from '@/components/SidebarItem';
import { BiHome, BiSearch } from 'react-icons/bi';
import UseDownloadSong from '@/hooks/useDownloadSong';

export default function Home() {
  const [songDescription, setSongDescription] = useState<Song | null>(null);
  const [allSong, setAllSong] = useState<Song[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const getAllSongs = useCallback(async () => {
    const value: Song[] = await UseGetSongs();
    setAllSong(value.reverse());
  }, []);

  useEffect(() => {
    getAllSongs();
  }, [UseDownloadSong, songDescription]);

  const [ytSearch, setYtSearch] = useState<Song[] | undefined>([]);

  const items = useMemo(
    () => [
      {
        icon: BiHome,
        label: 'Home',
        active: false,
        href: '',
        onClick: () => {
          setYtSearch([]);
        },
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: false,
        href: '',
        onClick: () => {
          setMenuOpen(true);
        },
      },
    ],
    [],
  );

  return (
    <main className="flex min-h-screen flex-col	bg-base-200 flex-1">
      <div className="flex md:flex-row  flex-col">
        <div className="md:hidden md:flex sm:flex-col p-2 m-1">
          {items.map((item, i) => {
            return <SidebarItem key={i} {...item} />;
          })}
        </div>
        <SearchMenu
          setYtSearch={setYtSearch}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          allSong={allSong}
          setSongDescription={setSongDescription}
        />
        <div className="flex flex-1">
          <Sidebar setMenuOpen={setMenuOpen} setYtSearch={setYtSearch} />
        </div>

        <div className="w-full bg-base-100 flex justify-center">
          {allSong.length === 0 && ytSearch?.length === 0 && (
            <span className="loading loading-spinner loading text-primary"></span>
          )}
          <div className="grid p-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
            {ytSearch?.length == 0
              ? allSong?.map((songInfo, i) => {
                  return (
                    songInfo.duration! > 0 && (
                      <SongItem
                        fromYt={false}
                        songInfo={songInfo}
                        setSongDescription={setSongDescription}
                        key={i}
                      />
                    )
                  );
                })
              : ytSearch?.map((item, i) => {
                  return (
                    item.duration! > 0 && (
                      <SongItem
                        fromYt={true}
                        songInfo={item}
                        setSongDescription={setSongDescription}
                        key={i}
                      />
                    )
                  );
                })}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-base-100  py-2 h-[80px] px-4 ">
        <PlayerContent
          allSong={allSong}
          songDescription={songDescription}
          setSongDescription={setSongDescription}
        />
      </div>
    </main>
  );
}
