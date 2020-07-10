import { Action, Player } from "../player/player";

/**
 * Determine if the game should go for another round.
 * @param dealer
 * @param players
 * @returns 'True' if the game should go another round
 */
export function isStillPlaying(dealer: Player, players: Player[]) {
  return dealer.status === Action.hit
    || players.some((player) => player.status === Action.hit);
}
