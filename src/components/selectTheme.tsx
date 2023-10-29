import React, { ChangeEvent, useEffect } from 'react';

const SelectTheme = () => {
  let themeStorage;
  useEffect(() => {
    themeStorage = localStorage.getItem('theme');
  }, []);

  const [theme, setTheme] = React.useState(themeStorage || 'mytheme');

  const toggleTheme = (value: string) => {
    setTheme(value);
  };

  React.useEffect(() => {
    const body = document.body;
    body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="flex flex-1 justify-center p-3">
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => toggleTheme(e.target.value)}
        className="select select-primary w-full justify-center max-w-xs"
      >
        <option value={'dracula'}>Select Theme</option>
        <option value={'dracula'}>dracula</option>
        <option value={'light'}>light</option>
        <option value={'cupcake'}>cupcake</option>
        <option value={'mytheme'}>mytheme</option>
        <option value={'dark'}>dark</option>
        <option value={'sinthwave'}>sinthwave</option>
      </select>
    </div>
  );
};

export default SelectTheme;
