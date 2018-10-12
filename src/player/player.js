import { getFinalHandValue, MAX_SCORE, DEALER_MAX_SCORE } from "../game/score";

export const ACTION = {
  hit: 0,
  stand: 1,
};

export const PLAYER_TYPE = {
  player: 0,
  dealer: 1,
};

export function doesPlayerStand(player, opponent) {
  const playerHandTotal = getFinalHandValue(player.hand);
  const opponentHandTotal = getFinalHandValue(opponent.hand);

  const isScoreHigherThanOpponent = 
        opponentHandTotal > MAX_SCORE
        || (opponent.status === ACTION.stand && playerHandTotal > opponentHandTotal);

  return isScoreHigherThanOpponent || doesPlayerBustOrHave21(player);
}

export function doesDealerStand(dealer, players) {
  return getFinalHandValue(dealer.hand) >= DEALER_MAX_SCORE
        || players.every(player => doesPlayerStand(dealer, player));
}

export function doesPlayerBustOrHave21(player) {
  return getFinalHandValue(player.hand) >= MAX_SCORE;
}
