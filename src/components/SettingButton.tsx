import React from 'react';
import { FaBars } from 'react-icons/fa';

const SettingButton = () => {
  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-base-content  p-2 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaBars className="text-black" />
    </button>
  );
};

export default SettingButton;
