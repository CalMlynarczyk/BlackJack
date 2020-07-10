import { Reducer } from "redux";
import { Card, getShuffledDeck } from "../hand/cards";
import { Action, doesDealerStand, doesPlayerBustOrHave21, doesPlayerStand, Player } from "../player/player";
import { ActionTypes, GameAction } from "./actions";

export interface GameState {
  deck: Card[];
  dealer: Player;
  players: Player[];
  playerTurn: number;
}

const initialState = {
  deck: [],
  dealer: {
    hand: [],
    status: Action.hit,
  },
  players: [
    {
      hand: [],
      status: Action.hit,
    },
  ],
  playerTurn: 0,
};

const blackjackApp: Reducer<GameState, GameAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PLAYER_HIT:
      return playerHit(state, action);
    case ActionTypes.PLAYER_STAND:
      return playerStand(state, action);
    case ActionTypes.DEALER_TURN:
      return dealerTurn(state);
    case ActionTypes.DEALER_HIT:
      return dealerHit(state);
    case ActionTypes.CHECK_PLAYER:
      return {
        ...state,
        players: state.players.map((player, index) =>
          index !== action.index
            ? player
            : {
              ...player,
              status: doesPlayerStand(player, state.dealer)
                ? Action.stand
                : Action.hit,
            },
        ),
      };
    case ActionTypes.CHECK_DEALER:
      return {
        ...state,
        dealer: {
          ...state.dealer,
          state: doesDealerStand(state.dealer, state.players)
            ? Action.stand
            : Action.hit,
        },
      };
    case ActionTypes.RESET:
      return {...initialState};
    case ActionTypes.SHUFFLE_DECK:
      return {
        ...state,
        deck: getShuffledDeck(),
      };
    default:
      return state;
  }
};

export default blackjackApp;

function playerHit(state: GameState, action: GameAction) {
  if (!state.deck || state.deck.length <= 0) {
    throw new Error("Can not deal card; deck is empty.");
  }

  const newCard = state.deck[0];

  return {
    ...state,
    deck: state.deck.slice(1),
    players: state.players.map((player, index) => {
      if (index !== action.index) {
        return player;
      } else {
        const updatedPlayer = {
          ...player,
          hand: [...player.hand, newCard],
        };

        if (doesPlayerBustOrHave21(updatedPlayer)) {
          updatedPlayer.status = Action.stand;
        }

        return {...updatedPlayer};
      }
    }),
    playerTurn: action.index >= state.players.length - 1
      ? -1
      : state.playerTurn + 1,
  };
}

function playerStand(state: GameState, action: GameAction) {
  return {
    ...state,
    players: state.players.map((player, index) =>
      index !== action.index
        ? player
        : {
          ...player,
          status: Action.stand,
        },
    ),
    playerTurn: action.index >= state.players.length - 1
      ? -1
      : state.playerTurn + 1,
  };
}

function dealerTurn(state: GameState) {
  if (doesDealerStand(state.dealer, state.players)) {
    return {
      ...state,
      dealer: {
        ...state.dealer,
        status: Action.stand,
      },
      playerTurn: 0,
    };
  } else {
    if (!state.deck || state.deck.length <= 0) {
      throw new Error("Can not deal card; deck is empty.");
    }

    const newCard = state.deck[0];
    const updatedDealer = {
      ...state.dealer,
      hand: [...state.dealer.hand, newCard],
    };

    if (doesPlayerBustOrHave21(updatedDealer)) {
      updatedDealer.status = Action.stand;
    }

    return {
      ...state,
      deck: state.deck.slice(1),
      dealer: updatedDealer,
      players: state.players.map((player) => {
        if (!doesPlayerStand(player, updatedDealer)) {
          return player;
        } else {
          return {
            ...player,
            status: Action.stand,
          };
        }
      }),
      playerTurn: 0,
    };
  }
}

function dealerHit(state: GameState) {
  if (!state.deck || state.deck.length <= 0) {
    throw new Error("Can not deal card; deck is empty.");
  }

  const newCard = state.deck[0];

  return {
    ...state,
    deck: state.deck.slice(1),
    dealer: {
      ...state.dealer,
      hand: [...state.dealer.hand, newCard],
    },
    playerTurn: 0,
  };
}
