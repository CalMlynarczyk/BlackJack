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
  return [
    // Clubs
    createCard(CardSuit.Club, CardValue.Ace),
    createCard(CardSuit.Club, CardValue.Two),
    createCard(CardSuit.Club, CardValue.Three),
    createCard(CardSuit.Club, CardValue.Four),
    createCard(CardSuit.Club, CardValue.Five),
    createCard(CardSuit.Club, CardValue.Six),
    createCard(CardSuit.Club, CardValue.Seven),
    createCard(CardSuit.Club, CardValue.Eight),
    createCard(CardSuit.Club, CardValue.Nine),
    createCard(CardSuit.Club, CardValue.Ten),
    createCard(CardSuit.Club, CardValue.Jack),
    createCard(CardSuit.Club, CardValue.Queen),
    createCard(CardSuit.Club, CardValue.King),
    // Spades
    createCard(CardSuit.Spade, CardValue.Ace),
    createCard(CardSuit.Spade, CardValue.Two),
    createCard(CardSuit.Spade, CardValue.Three),
    createCard(CardSuit.Spade, CardValue.Four),
    createCard(CardSuit.Spade, CardValue.Five),
    createCard(CardSuit.Spade, CardValue.Six),
    createCard(CardSuit.Spade, CardValue.Seven),
    createCard(CardSuit.Spade, CardValue.Eight),
    createCard(CardSuit.Spade, CardValue.Nine),
    createCard(CardSuit.Spade, CardValue.Ten),
    createCard(CardSuit.Spade, CardValue.Jack),
    createCard(CardSuit.Spade, CardValue.Queen),
    createCard(CardSuit.Spade, CardValue.King),
    // Hearts
    createCard(CardSuit.Heart, CardValue.Ace),
    createCard(CardSuit.Heart, CardValue.Two),
    createCard(CardSuit.Heart, CardValue.Three),
    createCard(CardSuit.Heart, CardValue.Four),
    createCard(CardSuit.Heart, CardValue.Five),
    createCard(CardSuit.Heart, CardValue.Six),
    createCard(CardSuit.Heart, CardValue.Seven),
    createCard(CardSuit.Heart, CardValue.Eight),
    createCard(CardSuit.Heart, CardValue.Nine),
    createCard(CardSuit.Heart, CardValue.Ten),
    createCard(CardSuit.Heart, CardValue.Jack),
    createCard(CardSuit.Heart, CardValue.Queen),
    createCard(CardSuit.Heart, CardValue.King),
    // Diamonds
    createCard(CardSuit.Diamond, CardValue.Ace),
    createCard(CardSuit.Diamond, CardValue.Two),
    createCard(CardSuit.Diamond, CardValue.Three),
    createCard(CardSuit.Diamond, CardValue.Four),
    createCard(CardSuit.Diamond, CardValue.Five),
    createCard(CardSuit.Diamond, CardValue.Six),
    createCard(CardSuit.Diamond, CardValue.Seven),
    createCard(CardSuit.Diamond, CardValue.Eight),
    createCard(CardSuit.Diamond, CardValue.Nine),
    createCard(CardSuit.Diamond, CardValue.Ten),
    createCard(CardSuit.Diamond, CardValue.Jack),
    createCard(CardSuit.Diamond, CardValue.Queen),
    createCard(CardSuit.Diamond, CardValue.King),
  ];
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
