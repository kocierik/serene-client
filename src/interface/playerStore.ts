import { Song } from './song';

export interface PlayerStore {
  ids: Song[];
  audioSong: HTMLAudioElement| null;
  activeId: number;
  isPlaying: boolean; 
  setSong(song: HTMLAudioElement): void;
  setIsPlaying(isPlaying: boolean): void;
  setId: (id: number) => void;
  setIds: (ids: Song[]) => void;
  reset: () => void;
}
