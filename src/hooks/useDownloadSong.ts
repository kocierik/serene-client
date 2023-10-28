import { GET_SONG_YT_URL } from "@/utils/const";

const UseDownloadSong = async (url: string) => {
    const response = await fetch(`${GET_SONG_YT_URL}${url}`, {mode: "no-cors"})
    const result = await response.text()
    return result;
  };
  
export default UseDownloadSong;