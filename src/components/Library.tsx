'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

const Library = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          {/*all the weird 'components' are just icons we got from react-icons*/}
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />{' '}
        {/*to create the color change once hover effect do hover:text-somecolor and transition, also set the default color too*/}
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3"></div>
    </div>
  );
};

export default Library;
