import { create } from 'zustand';
import { Song } from '../../types';

interface PlayerStore {
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


const usePlayer = create<PlayerStore>((set: (arg0: { activeId?: number; ids?: Song[]; audioSong?: HTMLAudioElement; isPlaying?: boolean;}) => any) => ({
  ids: [],
  audioSong: null,
  isPlaying: false,
  activeId: 0,
  setSong: (song: HTMLAudioElement) => set({audioSong: song}),
  setId: (id: number) => set({ activeId: id }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
  setIds: (ids: Song[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;