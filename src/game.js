import { getShuffledDeck } from "./hand/cards.js";
import { ACTION, adjustPlayerStatus, createPlayer, createDealer } from "./player/player.js";

let gameDeck, player, dealer, currentPlayer;

export function init() {
    gameDeck = getShuffledDeck();
    player = createPlayer();
    dealer = createDealer();
    currentPlayer = player;

    initialDeal();

    adjustPlayerStatus(player);
    adjustPlayerStatus(dealer);

    const keepPlaying = playAnotherRound();

    return { gameDeck: gameDeck, player: player, dealer: dealer, keepPlaying: keepPlaying };
}

function initialDeal() {
    dealCard(gameDeck, player.hand);
    dealCard(gameDeck, dealer.hand);
    dealCard(gameDeck, player.hand);
    dealCard(gameDeck, dealer.hand);
}

export function playTurn(player) {
    if (player.status === ACTION.hit) {
        dealCard(gameDeck, player.hand);
        adjustPlayerStatus(player);
    }
}

export function playAnotherRound() {
    return player.status === ACTION.hit || dealer.status === ACTION.hit;
}

function dealCard(deck, hand) {
    if (deck.length <= 0)
        throw "Deck is empty";

    hand.push(deck.pop());
}
