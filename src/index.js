import "./style.css";
import "./header.css";
import "./buttons.css";

import playGame from "./game/game.jsx";

const mainHeader = document.getElementsByClassName("main-header");

// Artificially delay this because the Webpack style loader
// causes the animation not to play.
setTimeout(() => {
  mainHeader[0].classList.remove("animate");
}, 100);

playGame("game-section");
