import { Song } from "../../types";

const useGetSongById = async (id?: string) => {

  if (!id) {
    return '';
  }
  const response = await fetch("http://localhost:4000/songs/5")
  console.log(response.body)

  return response;
};

export default useGetSongById;