const UseGetSongs = async () => {
    const response = await fetch(`http://localhost:4000/songs`)
    const songInfo = await response.json()
    return songInfo;
  };
  
  export default UseGetSongs;