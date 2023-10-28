import { GET_SONG_URL } from "@/utils/const";

const UseGetSongs = async () => {
    const response = await fetch(GET_SONG_URL)
    const songInfo = await response.json()
    return songInfo;
  };
  
  export default UseGetSongs;