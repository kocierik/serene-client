import { createContext } from 'react';

interface OnboardingContextValue {
  songAudio: HTMLAudioElement | null;
  setSongAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
}

export const songContext = createContext<OnboardingContextValue>(null!);
