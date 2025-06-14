import { useEffect } from 'react';

export default function usePlayWelcomeSound() {
  useEffect(() => {
    const audio = new Audio('/welcome-access-granted.mp3');
    audio.volume = 0.7;
    audio.play();
    return () => audio.pause();
  }, []);
}
