'use client';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SidebarItem from './SidebarItem';
import SelectTheme from './selectTheme';
import { Song } from '@/interface/song';

interface Props {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setYtSearch: Dispatch<SetStateAction<Song[] | undefined>>;
}

const Sidebar = ({ setMenuOpen, setYtSearch }: Props) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
        onClick: () => {
          setYtSearch([]);
        },
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '',
        onClick: () => {
          setMenuOpen(true);
        },
      },
    ],
    [pathname, setMenuOpen, setYtSearch],
  );

  return (
    <div className="flex flex-col bg-base-300">
      <div className="hidden md:flex flex-1  flex-col gap-y-2 w-[300px] ">
        {' '}
        {/*on med devices its flex mobile its hidden*/}
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} /> //spreading the rest of the props
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          {/* <Library /> */}
          <SelectTheme />
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
