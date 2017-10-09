import { init, playTurn, playAnotherRound } from "./game.js";
import { RESULT, getResult } from "./player/score.js";
import { ACTION } from "./player/player.js";
import renderPlayerSection from "./player/playerSection.jsx";

const mainHeader = document.getElementsByClassName("main-header");

mainHeader[0].classList.remove("animate");

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", reset);

let gameDeck, player, dealer, keepPlaying;

playGame();

function playGame() {
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
    resetButton.classList.remove("hide");

    const result = getResult(player, dealer);
    const resultView = document.getElementById("result-message");
    resultView.innerText = printResult(result);
    resultView.classList.remove("hide");
}

function printResult(result) {
    switch (result) {
        case RESULT.dealer_wins:
            return "Dealer wins";
        case RESULT.player_wins:
            return "Player wins";
        case RESULT.tie:
            return "Tie";
        default:
            throw "Invalid result";
    }
}

function reset() {
    document.getElementById("result-message").classList.add("hide");
    resetButton.classList.add("hide");

    playGame();
}
