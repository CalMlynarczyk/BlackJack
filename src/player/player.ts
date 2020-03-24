import { DEALER_MAX_SCORE, getFinalHandValue, MAX_SCORE } from "../game/score";
import { Hand } from "../hand/cards";

export enum Action {
  hit,
  stand,
}

export enum PlayerType {
  player,
  dealer,
}

export interface Player {
  hand: Hand;
  status: Action;
}

export function doesPlayerBustOrHave21(player: Player) {
  return getFinalHandValue(player.hand) >= MAX_SCORE;
}

export function doesPlayerStand(player: Player, opponent: Player) {
  const playerHandTotal = getFinalHandValue(player.hand);
  const opponentHandTotal = getFinalHandValue(opponent.hand);

  const isScoreHigherThanOpponent =
    opponentHandTotal > MAX_SCORE ||
    (opponent.status === Action.stand && playerHandTotal > opponentHandTotal);

  return isScoreHigherThanOpponent || doesPlayerBustOrHave21(player);
}

export function doesDealerStand(dealer: Player, players: Player[]) {
  return (
    getFinalHandValue(dealer.hand) >= DEALER_MAX_SCORE ||
    players.every((player) => doesPlayerStand(dealer, player))
  );
}
