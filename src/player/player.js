import { getFinalHandValue, MAX_SCORE, DEALER_MAX_SCORE } from "../game/score.js";

export const ACTION = {
    hit: 0,
    stand: 1,
};

export const PLAYER_TYPE = {
    player: 0,
    dealer: 1,
};

/**
 * Create a human player object
 */
export function createPlayer() {
    return createPlayerType(PLAYER_TYPE.player);
}

/**
 * Create a dealer player object
 */
export function createDealer() {
    return createPlayerType(PLAYER_TYPE.dealer);
}

function createPlayerType(type) {
    return {
        type: type,
        hand: [],
        status: ACTION.hit,
    };
}

/**
 * Change a player's status based on their hand value
 * @param {*} player 
 */
export function adjustPlayerStatus(player, otherPlayer) {
    if (doesPlayerStand(player, otherPlayer))
        player.status = ACTION.stand;
}

export function doesPlayerStand(player, otherPlayer) {
    const playerHandTotal = getFinalHandValue(player.hand);
    const hasOtherPlayer = otherPlayer !== undefined;

    const otherPlayerHandTotal = hasOtherPlayer
        ? getFinalHandValue(otherPlayer.hand)
        : null;

    const isScoreHigherThanOtherPlayer = !hasOtherPlayer
        ? false
        : otherPlayerHandTotal > MAX_SCORE
            || (otherPlayer.status === ACTION.stand && playerHandTotal > otherPlayerHandTotal);

    return isScoreHigherThanOtherPlayer
        || (player.type === PLAYER_TYPE.player && playerHandTotal >= MAX_SCORE)
        || (player.type === PLAYER_TYPE.dealer && playerHandTotal >= DEALER_MAX_SCORE);
}
