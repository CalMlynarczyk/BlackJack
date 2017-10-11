import { getShuffledDeck } from "../hand/cards.js";
import { ACTION, adjustPlayerStatus, createPlayer, createDealer } from "../player/player.js";

let gameDeck;

/**
 * Initialize a new game state
 */
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

/**
 * Play a turn for the given player using the given action
 * @param {*} player The player conducting the turn
 * @param {*} action The desired turn action for the player
 * @returns The update state of the given player
 */
export function playTurn(player, action) {
    player.status = !!action ? action : player.status;

    if (player.status === ACTION.hit) {
        dealCard(gameDeck, player.hand);
        adjustPlayerStatus(player);
    }

    return player;
}

/**
 * Determine if the game should go for around round
 * @param {*} player
 * @param {*} dealer
 * @returns 'True' if the game should go another round
 */
export function shouldPlayAnotherRound(player, dealer) {
    return player.status === ACTION.hit || dealer.status === ACTION.hit;
}

/**
 * Deal the "top" (i.e. first) card from the given deck
 * into the given hand. This is a small and isolated
 * function, so we allow it to mutate the given objects.
 * @param {*} deck
 * @param {*} hand 
 */
function dealCard(deck, hand) {
    if (deck.length <= 0)
        throw "Deck is empty";

    hand.push(deck.pop());
}
