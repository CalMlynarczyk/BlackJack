import { getFinalHandValue, MAX_SCORE, DEALER_MAX_SCORE } from "./score.js";

export const ACTION = {
    hit: 0,
    stand: 1,
};

export const PLAYER_TYPE = {
    player: 0,
    dealer: 1,
};

export function createPlayer() {
    return createPlayerType(PLAYER_TYPE.player);
}

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

function doesPlayerStand(player) {
    const handTotal = getFinalHandValue(player.hand);

    return (player.type === PLAYER_TYPE.player && handTotal >= MAX_SCORE)
        || (player.type === PLAYER_TYPE.dealer && handTotal >= DEALER_MAX_SCORE)
}

export function adjustPlayerStatus(player) {
    if (doesPlayerStand(player))
        player.status = ACTION.stand;
}