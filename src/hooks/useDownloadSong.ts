const UseDownloadSong = async (url: string) => {
    const response = await fetch(`http://localhost:4000/downloadSong?query=${url}`, {mode: "no-cors"})
    console.log("response --> ", response)
    const result = await response.text()
    console.log("result --> ", result)
    return result;
  };
  
export default UseDownloadSong;