import { PLAYER_HIT, PLAYER_STAND, DEALER_TURN, DEALER_HIT, RESET, NEXT_TURN, CHECK_PLAYER, CHECK_DEALER } from "./actions";
import { getShuffledDeck } from "../hand/cards";
import { doesDealerStand, doesPlayerStand, doesPlayerBustOrHave21, ACTION } from "../player/player";
import { getInitialState } from "./game";

const initialState = getInitialState();

export default function blackjackApp(state = initialState, action) {
    switch (action.type) {
        case PLAYER_HIT:
            return playerHit(state, action);
        case PLAYER_STAND:
            return playerStand(state, action);
        case DEALER_TURN:
            return dealerTurn(state, action);
        case DEALER_HIT:
            return dealerHit(state, action);
        case CHECK_PLAYER:
            return Object.assign({}, state, {
                players: state.players.map((player, index) => {
                    if (index !== action.index)
                        return player;
                    else {
                        return Object.assign({}, player, {
                            action: doesPlayerStand(player, state.dealer)
                                ? ACTION.stand
                                : ACTION.hit,
                        });
                    }
                }),
            });
        case CHECK_DEALER:
            return Object.assign({}, state, {
                dealer: Object.assign({}, state.dealer, {
                    action: doesDealerStand(state.dealer, state.players)
                        ? ACTION.stand
                        : ACTION.hit,
                }),
            });
        case RESET:
            return Object.assign({}, getInitialState());
        default:
            return state;
    }
}

function playerHit(state, action) {
    if (!state.deck || state.deck.length <= 0)
        throw "Can not deal card; deck is empty.";

    const newCard = state.deck[0];

    return Object.assign({}, state, {
        deck: state.deck.slice(1),
        players: state.players.map((player, index) => {
            if (index !== action.index)
                return player;
            else {
                let updatedPlayer = Object.assign({}, player, {
                    hand: [...player.hand, newCard],
                });
        
                if (doesPlayerBustOrHave21(updatedPlayer))
                    updatedPlayer.status = ACTION.stand;

                return Object.assign({}, updatedPlayer);
            }
        }),
        playerTurn: action.index >= state.players.length - 1
            ? -1
            : state.playerTurn + 1,
    });
}

function playerStand(state, action) {
    return Object.assign({}, state, {
        players: state.players.map((player, index) => {
            if (index !== action.index)
                return player;
            else {
                return Object.assign({}, player, {
                    status: ACTION.stand,
                });
            }
        }),
        playerTurn: action.index >= state.players.length - 1
            ? -1
            : state.playerTurn + 1,
    });
}

function dealerTurn(state, action) {
    if (doesDealerStand(state.dealer, state.players)) {
        return Object.assign({}, state, {
            dealer: Object.assign({}, state.dealer, {
                status: ACTION.stand,
            }),
            playerTurn: 0,
        });
    } else {
        if (!state.deck || state.deck.length <= 0)
            throw "Can not deal card; deck is empty.";

        const newCard = state.deck[0];
        let updatedDealer = Object.assign({}, state.dealer, {
            hand: [...state.dealer.hand, newCard],
        });

        if (doesPlayerBustOrHave21(updatedDealer))
            updatedDealer.status = ACTION.stand;

        return Object.assign({}, state, {
            deck: state.deck.slice(1),
            dealer: updatedDealer,
            players: state.players.map(player => {
                if (!doesPlayerStand(player, updatedDealer)) {
                    return player;
                } else {
                    return Object.assign({}, player, {
                        status: ACTION.stand,
                    });
                }
            }),
            playerTurn: 0,
        });
    }
}

function dealerHit(state, action) {
    if (!state.deck || state.deck.length <= 0)
        throw "Can not deal card; deck is empty.";

    const newCard = state.deck[0];

    return Object.assign({}, state, {
        deck: state.deck.slice(1),
        dealer: Object.assign({}, state.dealer, {
            hand: [...state.dealer.hand, newCard],
        }),
        playerTurn: 0,
    });
}
