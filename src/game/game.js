import { getShuffledDeck } from "../hand/cards";
import { ACTION } from "../player/player";

export function getInitialState() {
    return {
        deck: getShuffledDeck(),
        dealer: {
            hand: [],
            status: ACTION.hit,
        },
        players: [
            {
                hand: [],
                status: ACTION.hit,
            },
        ],
        playerTurn: 0,
    };
}

/**
 * Determine if the game should go for around round
 * @param {*} dealer
 * @param {*} players
 * @returns 'True' if the game should go another round
 */
export function isStillPlaying(dealer, players) {
    return dealer.status === ACTION.hit
        || players.some(player => player.status === ACTION.hit);
}
