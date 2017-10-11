import playGame from "./game.jsx";

const mainHeader = document.getElementsByClassName("main-header");
mainHeader[0].classList.remove("animate");

playGame("game-section");
