import { create } from 'zustand';
import { PlayerStore } from '@/interface/playerStore';
import { Song } from '@/interface/song';

const usePlayer = create<PlayerStore>(
  (
    set: (arg0: {
      activeId?: number;
      ids?: Song[];
      audioSong?: HTMLAudioElement;
      isPlaying?: boolean;
    }) => unknown,
  ) => ({
    ids: [],
    audioSong: null,
    isPlaying: false,
    activeId: 0,
    setSong: (song: HTMLAudioElement) => set({ audioSong: song }),
    setId: (id: number) => set({ activeId: id }),
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
    setIds: (ids: Song[]) => set({ ids }),
    reset: () => set({ ids: [], activeId: undefined }),
  }),
);

export default usePlayer;
