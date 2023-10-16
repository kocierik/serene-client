import React from 'react'

const SelectTheme = () => {

    const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "mytheme");

    const toggleTheme = (value: string) => {
      setTheme(value);
    };
  
    React.useEffect(() => {
      const body = document.body;
      body.setAttribute("data-theme", theme);
    }, [theme]);
    
  return (
    <div className='flex flex-1 justify-center p-3'>
    <select onChange={(e: Event) => toggleTheme(e.target.value)} className="select select-primary w-full justify-center max-w-xs">
      <option value={"dracula"}>dracula</option>
      <option value={"light"}>light</option>
      <option value={"cupcake"}>cupcake</option>
      <option value={"mytheme"}>mytheme</option>
      <option value={'dark'}>dark</option>
      <option value={'sinthwave'}>sinthwave</option>
    </select>
  </div>
  )
}

export default SelectTheme