const mainHeader = document.getElementsByClassName("main-header");

mainHeader[0].classList.remove("animate");

const hitButton = document.getElementById("player-hit-button");
const standButton = document.getElementById("player-stand-button");
const resetButton = document.getElementById("reset-button");

hitButton.addEventListener("click", hitButtonClicked);
standButton.addEventListener("click", standButtonClicked);
resetButton.addEventListener("click", reset);

let gameDeck, player, dealer, keepPlaying;

playGame();

function playGame() {
    ({ gameDeck, player, dealer, keepPlaying } = init());
    updateView(player, dealer);
    
    if (!keepPlaying)
        displayResult();
}

function updateView() {
    document.getElementById("player-score").innerText = getFinalHandValue(player.hand);
    document.getElementById("dealer-score").innerText = getFinalHandValue(dealer.hand);
}

function hitButtonClicked() {
    playerActionTaken(ACTION.hit);
}

function standButtonClicked() {
    playerActionTaken(ACTION.stand);
}

function playerActionTaken(action) {
    player.status = action;

    let roundStatus;

    const gameLoop = () => {
        roundStatus = playRound(gameDeck, player, dealer);
        updateView();
        
        if (!roundStatus)
            displayResult();
    };

    gameLoop();

    if (roundStatus && player.status === ACTION.stand) {
        while (roundStatus) {
            gameLoop();
        }
    }
}

function displayResult() {
    hitButton.classList.add("hide");
    standButton.classList.add("hide");
    resetButton.classList.remove("hide");

    const result = getResult(player, dealer);
    const resultView = document.getElementById("result-message");
    resultView.innerText = printResult(result);
    resultView.classList.remove("hide");
}

function reset() {
    document.getElementById("result-message").classList.add("hide");
    hitButton.classList.remove("hide");
    standButton.classList.remove("hide");
    resetButton.classList.add("hide");

    playGame();
}
