const CARD_SUITS = {
    spade: 0,
    club: 13,
    hear: 26,
    diamond: 39
};

const CARD_VALUES = {
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

const ACTION = {
    hit: 0,
    stand: 1,
};

const PLAYER_TYPE = {
    player: 0,
    dealer: 1,
};

const RESULT = {
    player_wins: 0,
    dealer_wins: 1,
    tie: 2,
};

const MAX_SCORE = 21;
const DEALER_MAX_SCORE = 17;

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

function init() {
    let gameDeck = shuffle(DECK);
    let player = createPlayer(PLAYER_TYPE.player);
    let dealer = createPlayer(PLAYER_TYPE.dealer);

    let keepPlaying = initialDeal(gameDeck, player, dealer);

    return { gameDeck: gameDeck, player: player, dealer: dealer, keepPlaying: keepPlaying };
}

function printResult(result) {
    switch (result) {
        case RESULT.dealer_wins:
            return "Dealer wins";
        case RESULT.player_wins:
            return "Player wins";
        case RESULT.tie:
            return "Tie";
        default:
            throw "Invalid result";
    }
}

function getResult(player, dealer) {
    const playerTotal = getFinalHandValue(player.hand);
    const dealerTotal = getFinalHandValue(dealer.hand);

    if (playerTotal > MAX_SCORE 
        || (dealerTotal <= MAX_SCORE && playerTotal < dealerTotal))
        return RESULT.dealer_wins;
    else if (playerTotal === dealerTotal)
        return RESULT.tie;
    else
        return RESULT.player_wins;
}

function createPlayer(type) {
    return {
        type: type,
        hand: [],
        status: ACTION.hit,
    };
}

function initialDeal(deck, player, dealer) {
    playRound(deck, player, dealer);
    return playRound(deck, player, dealer);
}

function playTurn(deck, player) {
    if (player.status === ACTION.hit) {
        dealCard(deck, player.hand);

        const handTotal = getFinalHandValue(player.hand);

        if ((player.type === PLAYER_TYPE.player && handTotal >= MAX_SCORE)
            || (player.type === PLAYER_TYPE.dealer && handTotal >= DEALER_MAX_SCORE)) {
            player.status = ACTION.stand;
        }
    }
}

function playRound(deck, player, dealer) {
    playTurn(deck, player);
    playTurn(deck, dealer);

    return player.status === ACTION.hit || dealer.status === ACTION.hit;
}

function dealCard(deck, hand) {
    if (deck.length <= 0)
        throw "Deck is empty";

    hand.push(deck.pop());
}

function getHandValue(hand) {
    const startingTotal = createTotal(0, 0);

    return hand.reduce((total, card) => { 
        // We are evaluating an Ace
        if (Array.isArray(card.value)) {
            const hardValue = card.value[0];
            const softValue = card.value[1];

            // Determine if we have already calculated for an Ace in the hand
            return total.hard !== total.soft
                ? createTotal(total.hard + hardValue, total.soft + softValue)
                : createTotal(total.hard + hardValue, total.soft + hardValue);
        } else {
            return createTotal(total.hard + card.value, total.soft + card.value);
        }
    }, startingTotal); 
}

function getFinalHandValue(hand) {
    const total = getHandValue(hand);

    return total.soft <= MAX_SCORE
        ? total.soft
        : total.hard;
}

function createTotal(hardTotal, softTotal) {
    return { hard: hardTotal, soft: softTotal };
}

// Knuth Shuffle Algorithm borrowed from https://git.daplie.com/Daplie/knuth-shuffle
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
