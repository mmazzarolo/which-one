import gameStartSound from "../assets/sounds/game-start.mp3";
import swipeSuccessSound from "../assets/sounds/swipe-success.mp3";
import swipeFailureSound from "../assets/sounds/swipe-failure.mp3";

const playSound = (src: string) => {
  // TODO: Fix the Safari autoplay lock
  // For reference:
  // https://www.ibm.com/developerworks/library/wa-ioshtml5/index.html#N1025A
  const isSafari = navigator.userAgent.indexOf("Safari") > -1;
  if (!isSafari) {
    const audio = new Audio(src);
    audio.play();
  }
};

const playGameStartSound = () => {
  playSound(gameStartSound);
};

const playSwipeSuccessSound = () => {
  playSound(swipeSuccessSound);
};

const playSwipeFailureSound = () => {
  playSound(swipeFailureSound);
};

export default {
  playGameStartSound,
  playSwipeSuccessSound,
  playSwipeFailureSound
};
