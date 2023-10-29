import { GET_SONG_URL } from '@/utils/const';

const UseGetSongById = async (id: string) => {
  const response = await fetch(`${GET_SONG_URL}/${id}`);
  const bytesAudio = await response.blob();
  return bytesAudio;
};

export default UseGetSongById;
