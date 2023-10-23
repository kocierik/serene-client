import React from 'react'
import { IconType } from 'react-icons'
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';//I think tw merge allows you to do the pass styling in as classnames trick

interface Props {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  onClick?:  React.MouseEventHandler<HTMLDivElement> | undefined
}

const SidebarItem: React.FC<Props> = ({ icon: Icon, label, active, href, onClick }) => {
  return (
    <div onClick={onClick} className={twMerge(`flex p-1 border-b-2 border-base-100 mt-2 flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`, active && 'text-white')}>
      <Icon size={26} />
      <p className='truncate w-full'>{label}</p>
    </div>
  )
}

export default SidebarItem
