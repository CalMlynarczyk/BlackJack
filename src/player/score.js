export const RESULT = {
    player_wins: 0,
    dealer_wins: 1,
    tie: 2,
};

export const MAX_SCORE = 21;
export const DEALER_MAX_SCORE = 17;

function getHandValue(hand) {
    const startingTotal = createTotal(0, 0);

    return hand.reduce((total, card) => { 
        // We are evaluating an Ace
        if (Array.isArray(card.value.val)) {
            const hardValue = card.value.val[0];
            const softValue = card.value.val[1];

            // Determine if we have already calculated for an Ace in the hand
            return total.hard !== total.soft
                ? createTotal(total.hard + hardValue, total.soft + softValue)
                : createTotal(total.hard + hardValue, total.soft + hardValue);
        } else {
            return createTotal(total.hard + card.value.val, total.soft + card.value.val);
        }
    }, startingTotal); 
}

export function getFinalHandValue(hand) {
    const total = getHandValue(hand);

    return total.soft <= MAX_SCORE
        ? total.soft
        : total.hard;
}

function createTotal(hardTotal, softTotal) {
    return { hard: hardTotal, soft: softTotal };
}

export function getResult(player, dealer) {
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
