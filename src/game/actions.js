import { ACTION } from "../player/player";

export const PLAYER_HIT = "PLAYER_HIT";
export const PLAYER_STAND = "PLAYER_STAND";
export const DEALER_TURN = "DEALER_TURN";
export const DEALER_HIT = "DEALER_HIT";
export const NEXT_TURN = "NEXT_TURN";
export const CHECK_PLAYER = "CHECK_PLAYER";
export const CHECK_DEALER = "CHECK_DEALER";
export const RESET = "RESET";

export function playerHit(index, noDealerTurn) {
  return (dispatch, getState) => { 
    dispatch({
      type: PLAYER_HIT,
      index,
    });

    if (noDealerTurn) {
      const state = getState();

      if (state.playerTurn < 0
                && (state.dealer.status === ACTION.hit
                    || state.players.some(player => player.status === ACTION.hit))) {
        dispatch(dealerTurn());
      }
    }
  };
}

export function playerStand(index) {
  return (dispatch, getState) => { 
    dispatch({
      type: PLAYER_STAND,
      index,
    });

    const state = getState();

    if (state.playerTurn < 0
            && (state.dealer.status === ACTION.hit
                || state.players.some(player => player.status === ACTION.hit))) {
      dispatch(dealerTurn());
    }
  };
}

export function dealerTurn() {
  return (dispatch, getState) => {
    const state = getState();

    if (state.dealer.status === ACTION.hit) {
      dispatch({ 
        type: DEALER_TURN,
      });

      if (state.players.every(player => player.status === ACTION.stand)) {
        dispatch({
          type: DEALER_TURN,
        });

        dispatch(dealerTurn());
      }
    } else {
      dispatch({
        type: NEXT_TURN,
      });
    }
  };
}

export function dealerHit() {
  return {
    type: DEALER_HIT,
  };
}

export function checkPlayer(index) {
  return { 
    type: CHECK_PLAYER,
    index,
  };
}

export function checkDealer() {
  return { 
    type: CHECK_DEALER,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
