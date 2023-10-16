const UseGetSongById = async (id: number) => {
  const response = await fetch(`http://localhost:4000/songs/${id}`)
  const bytesAudio = await response.blob()
  return bytesAudio;
};

export default UseGetSongById;