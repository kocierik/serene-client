
const sanitizeInput = (input: string) => {
  return input.replace(/[^a-zA-Z0-9 ]+/g, '').replaceAll(' ', '');
};

const UseGetSongByArtistTitle = async (artistTitle: string) => {
    const sanitizedArtistTitle = sanitizeInput(artistTitle);
    const response = await fetch(`http://localhost:4000/songName/${sanitizedArtistTitle}`)
    const bytesAudio = await response.blob()
    return bytesAudio;
  };
  
  export default UseGetSongByArtistTitle;