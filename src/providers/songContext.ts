import { createContext } from "react"

interface OnboardingContextValue {
    song: HTMLAudioElement | null;
    setSong: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  }

export const songContext = createContext<OnboardingContextValue>(null!);