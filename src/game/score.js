import { CardValue, mapCardValues } from "../hand/cards.ts";
import { ACTION } from "../player/player";

/**
 * The game result enumeration
 */
export const RESULT = {
  player_wins: 0,
  dealer_wins: 1,
  tie: 2,
  still_playing: 3,
};

/**
 * The highest score before going bust
 */
export const MAX_SCORE = 21;

/**
 * The threshold score for the dealer before they stand
 */
export const DEALER_MAX_SCORE = 17;

function getHandValue(hand) {
  const startingTotal = createTotal(0, 0);

  return hand.reduce((total, card) => { 
    const cardNumericValue = mapCardValues.get(card.value);

    // We are evaluating an Ace
    if (card.value === CardValue.Ace) {
      const hardValue = cardNumericValue[0];
      const softValue = cardNumericValue[1];

      // Determine if we have already calculated for an Ace in the hand
      return total.hard !== total.soft
        ? createTotal(total.hard + hardValue, total.soft + hardValue)
        : createTotal(total.hard + hardValue, total.soft + softValue);
    } else {
      return createTotal(total.hard + cardNumericValue, total.soft + cardNumericValue);
    }
  }, startingTotal); 
}

/**
 * Get the total hand value, picking between the
 * hard and soft hand total.
 * @param {*} hand The hand to total
 */
export function getFinalHandValue(hand) {
  const total = getHandValue(hand);

  return total.soft <= MAX_SCORE
    ? total.soft
    : total.hard;
}

function createTotal(hardTotal, softTotal) {
  return { hard: hardTotal, soft: softTotal };
}

/**
 * Get the result object based off of the given players
 * @param {*} player The human player
 * @param {*} dealer The dealer
 */
export function isPlayerWinner(player, dealer) {
  const playerTotal = getFinalHandValue(player.hand);
  const dealerTotal = getFinalHandValue(dealer.hand);

  return playerTotal <= MAX_SCORE 
        && (dealerTotal > MAX_SCORE || playerTotal > dealerTotal);
}

/**
 * Get the result object based off of the given players
 * @param {*} player The human player
 * @param {*} dealer The dealer
 */
export function isDealerWinner(dealer, players) {
  const dealerTotal = getFinalHandValue(dealer.hand);

  return players.every(player => {
    const playerTotal = getFinalHandValue(player.hand);

    return playerTotal > MAX_SCORE 
            || (dealerTotal <= MAX_SCORE && playerTotal < dealerTotal);
  });
}

export function isTie(dealer, players) {
  const dealerTotal = getFinalHandValue(dealer.hand);

  return dealer.status === ACTION.stand
        && players.every(player => {
          const playerTotal = getFinalHandValue(player.hand);

          return player.status === ACTION.stand
                && dealerTotal === playerTotal
                || (playerTotal > MAX_SCORE && dealerTotal > MAX_SCORE);
        });
}
