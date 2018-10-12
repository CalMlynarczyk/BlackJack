import { PLAYER_HIT, PLAYER_STAND, DEALER_TURN, DEALER_HIT, RESET, CHECK_PLAYER, CHECK_DEALER } from "./actions";
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
      return {
        ...state,
        players: state.players.map((player, index) => {
          if (index !== action.index)
            return player;
          else {
            return {
              ...player,
              action: doesPlayerStand(player, state.dealer)
                ? ACTION.stand
                : ACTION.hit,
            };
          }
        }),
      };
    case CHECK_DEALER:
      return {
        ...state,
        dealer: {
          ...state.dealer,
          action: doesDealerStand(state.dealer, state.players)
            ? ACTION.stand
            : ACTION.hit,
        },
      };
    case RESET:
      return {...getInitialState()};
    default:
      return state;
  }
}

function playerHit(state, action) {
  if (!state.deck || state.deck.length <= 0)
    throw "Can not deal card; deck is empty.";

  const newCard = state.deck[0];

  return {
    ...state,
    deck: state.deck.slice(1),
    players: state.players.map((player, index) => {
      if (index !== action.index)
        return player;
      else {
        const updatedPlayer = {
          ...player,
          hand: [...player.hand, newCard],
        };
        
        if (doesPlayerBustOrHave21(updatedPlayer))
          updatedPlayer.status = ACTION.stand;

        return {...updatedPlayer};
      }
    }),
    playerTurn: action.index >= state.players.length - 1
      ? -1
      : state.playerTurn + 1,
  };
}

function playerStand(state, action) {
  return {
    ...state,
    players: state.players.map((player, index) => {
      if (index !== action.index)
        return player;
      else {
        return {
          ...player,
          status: ACTION.stand,
        };
      }
    }),
    playerTurn: action.index >= state.players.length - 1
      ? -1
      : state.playerTurn + 1,
  };
}

function dealerTurn(state) {
  if (doesDealerStand(state.dealer, state.players)) {
    return {
      ...state,
      dealer: {
        ...state.dealer,
        status: ACTION.stand,
      },
      playerTurn: 0,
    };
  } else {
    if (!state.deck || state.deck.length <= 0)
      throw "Can not deal card; deck is empty.";

    const newCard = state.deck[0];
    const updatedDealer = {
      ...state.dealer,
      hand: [...state.dealer.hand, newCard],
    };

    if (doesPlayerBustOrHave21(updatedDealer))
      updatedDealer.status = ACTION.stand;

    return {
      ...state,
      deck: state.deck.slice(1),
      dealer: updatedDealer,
      players: state.players.map(player => {
        if (!doesPlayerStand(player, updatedDealer)) {
          return player;
        } else {
          return {
            ...player,
            status: ACTION.stand,
          };
        }
      }),
      playerTurn: 0,
    };
  }
}

function dealerHit(state) {
  if (!state.deck || state.deck.length <= 0)
    throw "Can not deal card; deck is empty.";

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
