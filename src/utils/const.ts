const PORT = 4000
const BASE_URL = `http://localhost:${PORT}`;
export const GET_SONG_URL = `${BASE_URL}/songs`;
export const GET_SONG_YT_URL = `${BASE_URL}/downloadSong?query=`;
export const GET_SEARCH_SONG_YT_URL = `${BASE_URL}/search?query=`;
export const GET_SONG_FROM_TITLE_URL = `${BASE_URL}/songName/`;
