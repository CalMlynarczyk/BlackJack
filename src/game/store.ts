import { Card, getShuffledDeck } from "../hand/cards";
import { Action, Player, PlayerType } from "../player/player";

export interface GameState {
  deck: Card[];
  dealer: Player;
  players: Player[];
  playerTurn: number;
}

export function getInitialState(): GameState {
  return {
    deck: getShuffledDeck(),
    dealer: {
      type: PlayerType.dealer,
      hand: [],
      status: Action.hit,
    },
    players: [
      {
        type: PlayerType.player,
        hand: [],
        status: Action.hit,
      },
    ],
    playerTurn: 0,
  };
}

/**
 * Determine if the game should go for around round.
 * @param dealer
 * @param players
 * @returns 'True' if the game should go another round
 */
export function isStillPlaying(dealer, players) {
  return dealer.status === Action.hit
    || players.some((player) => player.status === Action.hit);
}