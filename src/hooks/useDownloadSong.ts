const UseDownloadSong = async (url: string) => {
    const response = await fetch(`http://localhost:4000/downloadSong?query=${url}`, {mode: "no-cors"})
    const result = await response.text()
    return result;
  };
  
export default UseDownloadSong;