import { getShuffledDeck } from "../hand/cards.ts";
import { Action } from "../player/player";

export function getInitialState() {
  return {
    deck: getShuffledDeck(),
    dealer: {
      hand: [],
      status: Action.hit,
    },
    players: [
      {
        hand: [],
        status: Action.hit,
      },
    ],
    playerTurn: 0,
  };
}

/**
 * Determine if the game should go for around round
 * @param {*} dealer
 * @param {*} players
 * @returns 'True' if the game should go another round
 */
export function isStillPlaying(dealer, players) {
  return dealer.status === Action.hit
    || players.some(player => player.status === Action.hit);
}
