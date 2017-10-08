/**
 * Fixed enumeration for card suits
 */
export const CARD_SUITS = {
    spade: 0,
    club: 13,
    heart: 26,
    diamond: 39
};

/**
 * Fixed enumeration for card values
 */
export const CARD_VALUES = {
    ace: [1, 11],
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 10,
    queen: 10,
    king: 10,
};

const DECK = createDeck();

function createDeck() {
    let deck = [];

    for (const suit of Object.keys(CARD_SUITS)) {
        for (const value of Object.keys(CARD_VALUES)) {
            const card = createCard(CARD_SUITS[suit], CARD_VALUES[value]);
            deck.push(card);
        }
    }

    return deck;
}

function createCard(suit, value) {
    return { suit: suit, value: value };
}

/**
 * Knuth Shuffle Algorithm borrowed from https://git.daplie.com/Daplie/knuth-shuffle
 * @param {*} array The array to shuffle
 * @returns A shuffled copy of the given array
 */
function shuffle(array) {
    let shuffledArray = Array.from(array);
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
 * Get an array of card objects in random order
 */
export function getShuffledDeck() {
    return shuffle(DECK);
}
