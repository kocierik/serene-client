import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  audioSong: HTMLAudioElement| null;
  activeId?: string;
  isPlaying: boolean; 
  setSong(song: HTMLAudioElement): void;
  setIsPlaying(isPlaying: boolean): void;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set: (arg0: { activeId?: string | undefined; ids?: string[] | never[]; audioSong?: HTMLAudioElement; isPlaying?: boolean;}) => any) => ({
  ids: [],
  audioSong: null,
  isPlaying: false,
  activeId: undefined,
  setSong: (song: HTMLAudioElement) => set({audioSong: song}),
  setId: (id: string) => set({ activeId: id }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;