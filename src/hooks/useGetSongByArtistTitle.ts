import { GET_SONG_FROM_TITLE_URL } from '@/utils/const';
import { sanitizeInput } from '@/utils/sanitizeInput';

const UseGetSongByArtistTitle = async (artistTitle: string) => {
  const sanitizedArtistTitle = sanitizeInput(artistTitle);
  const response = await fetch(`${GET_SONG_FROM_TITLE_URL}${sanitizedArtistTitle}`);
  const bytesAudio = await response.blob();
  const objectURL = URL.createObjectURL(bytesAudio);
  const audioSong = new Audio(objectURL);
  return audioSong;
};

export default UseGetSongByArtistTitle;
