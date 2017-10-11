import { getShuffledDeck } from "../hand/cards.js";
import { ACTION, adjustPlayerStatus, createPlayer, createDealer } from "../player/player.js";

let gameDeck;

export function init() {
    gameDeck = getShuffledDeck();
    let player = createPlayer();
    let dealer = createDealer();

    initialDeal(gameDeck, player, dealer);

    adjustPlayerStatus(player);
    adjustPlayerStatus(dealer);

    const keepPlaying = shouldPlayAnotherRound(player, dealer);

    return { player: player, dealer: dealer, keepPlaying: keepPlaying };
}

function initialDeal(gameDeck, player, dealer) {
    dealCard(gameDeck, player.hand);
    dealCard(gameDeck, dealer.hand);
    dealCard(gameDeck, player.hand);
    dealCard(gameDeck, dealer.hand);
}

export function playTurn(player, action) {
    player.status = !!action ? action : player.status;

    if (player.status === ACTION.hit) {
        dealCard(gameDeck, player.hand);
        adjustPlayerStatus(player);
    }

    return player;
}

export function shouldPlayAnotherRound(player, dealer) {
    return player.status === ACTION.hit || dealer.status === ACTION.hit;
}

function dealCard(deck, hand) {
    if (deck.length <= 0)
        throw "Deck is empty";

    hand.push(deck.pop());
}
