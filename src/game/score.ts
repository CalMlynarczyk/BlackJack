import { CardValue, Hand, mapCardValues } from "../hand/cards";
import { Action, Player } from "../player/player";

/**
 * The game result enumeration
 */
export enum RESULT {
  PlayerWins,
  DealerWins,
  Tie,
  StillPlaying,
}

interface HandTotal {
  hard: number;
  soft: number;
}

/**
 * The highest score before going bust
 */
export const MAX_SCORE = 21;

/**
 * The threshold score for the dealer before they stand
 */
export const DEALER_MAX_SCORE = 17;

function createTotal(hardTotal: number, softTotal: number): HandTotal {
  return { hard: hardTotal, soft: softTotal };
}

function getHandValue(hand: Hand) {
  const startingTotal = createTotal(0, 0);

  return hand.reduce((total, card) => {
    const cardNumericValue = mapCardValues.get(card.value);

    // We are evaluating an Ace
    if (card.value === CardValue.Ace) {
      const hardValue = (cardNumericValue as number[])[0];
      const softValue = (cardNumericValue as number[])[1];

      // Determine if we have already calculated for an Ace in the hand
      return total.hard !== total.soft
        ? createTotal(total.hard + hardValue, total.soft + hardValue)
        : createTotal(total.hard + hardValue, total.soft + softValue);
    } else {
      return createTotal(total.hard + (cardNumericValue as number), total.soft + (cardNumericValue as number));
    }
  }, startingTotal);
}

/**
 * Get the total hand value, picking between the
 * hard and soft hand total.
 * @param hand The hand to total
 */
export function getFinalHandValue(hand: Hand) {
  const total = getHandValue(hand);

  return total.soft <= MAX_SCORE
    ? total.soft
    : total.hard;
}

/**
 * Get the result object based off of the given players
 * @param player The human player
 * @param dealer The dealer
 */
export function isPlayerWinner(player: Player, dealer: Player) {
  const playerTotal = getFinalHandValue(player.hand);
  const dealerTotal = getFinalHandValue(dealer.hand);

  return playerTotal <= MAX_SCORE
    && (dealerTotal > MAX_SCORE || playerTotal > dealerTotal);
}

/**
 * Get the result object based off of the given players
 * @param player The human player
 * @param dealer The dealer
 */
export function isDealerWinner(dealer: Player, players: Player[]) {
  const dealerTotal = getFinalHandValue(dealer.hand);

  return players.every((player) => {
    const playerTotal = getFinalHandValue(player.hand);

    return playerTotal > MAX_SCORE
      || (dealerTotal <= MAX_SCORE && playerTotal < dealerTotal);
  });
}

export function isTie(dealer: Player, players: Player[]) {
  const dealerTotal = getFinalHandValue(dealer.hand);

  return dealer.status === Action.stand
    && players.every((player) => {
      const playerTotal = getFinalHandValue(player.hand);

      return player.status === Action.stand
        && dealerTotal === playerTotal
        || (playerTotal > MAX_SCORE && dealerTotal > MAX_SCORE);
    });
}
