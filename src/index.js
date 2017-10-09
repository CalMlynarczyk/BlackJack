import { init, playTurn, playAnotherRound } from "./game.js";
import { getResult } from "./player/score.js";
import { ACTION } from "./player/player.js";
import renderPlayerSection from "./player/playerSection.jsx";
import renderResultSection from "./result.jsx";

const mainHeader = document.getElementsByClassName("main-header");
mainHeader[0].classList.remove("animate");

let gameDeck, player, dealer, keepPlaying;

playGame();

function playGame() {
    renderResultSection(null, false, playGame, "result-message");
    ({ gameDeck, player, dealer, keepPlaying } = init());

    renderPlayers();
    
    if (!keepPlaying)
        displayResult();
}

function renderPlayers() {
    renderPlayerSection(player, (action) => playerTurn(action), "player-section");
    renderPlayerSection(dealer, null, "dealer-section");
}

function playerTurn(action) {
    player.status = action;
    playTurn(player);

    renderPlayers();

    dealerTurn();
}

function dealerTurn() {
    playTurn(dealer);

    renderPlayers();

    if (!playAnotherRound(player, dealer))
        displayResult();
    else if (player.status === ACTION.stand)
        dealerTurn();
}

function displayResult() {
    const result = getResult(player, dealer);
    renderResultSection(result, true, playGame, "result-message");
}
