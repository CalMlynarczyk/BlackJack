export enum CardSuit {
  Spade = 0,
  Club = 13,
  Heart = 26,
  Diamond = 39,
}

export enum CardValue {
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

export interface Card {
  suit: CardSuit;
  value: CardValue;
}

export type Hand = Card[];

export const mapCardValues = new Map<CardValue, number | number[]>([
  [CardValue.Ace, [1, 11]],
  [CardValue.Two, 2],
  [CardValue.Three, 3],
  [CardValue.Four, 4],
  [CardValue.Five, 5],
  [CardValue.Six, 6],
  [CardValue.Seven, 7],
  [CardValue.Eight, 8],
  [CardValue.Nine, 9],
  [CardValue.Ten, 10],
  [CardValue.Jack, 10],
  [CardValue.Queen, 10],
  [CardValue.King, 10],
]);

export function createCard(suit: CardSuit, value: CardValue): Card {
  return { suit, value };
}

function createDeck() {
  const deck: Card[] = [];

  for (const suit of Object.values(CardSuit).slice(
    Object.values(CardSuit).length / 2
  )) {
    for (const value of Object.values(CardValue).slice(
      Object.values(CardValue).length / 2
    )) {
      const card = createCard(suit, value);
      deck.push(card);
    }
  }

  return deck;
}

const DECK = createDeck();

/**
 * Knuth Shuffle Algorithm borrowed from https://git.daplie.com/Daplie/knuth-shuffle.
 * @param array The array to shuffle
 * @returns A shuffled copy of the given array
 */
function shuffle<T>(array: ArrayLike<T>) {
  const shuffledArray = Array.from(array);
  let currentIndex = array.length;

  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}

/**
 * Get an array of card objects in random order.
 */
export function getShuffledDeck() {
  return shuffle(DECK);
}
