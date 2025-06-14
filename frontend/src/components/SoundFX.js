const clickSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7b2.mp3');
export const playClick = () => {
  clickSound.currentTime = 0;
  clickSound.play();
};
