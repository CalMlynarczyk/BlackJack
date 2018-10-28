import { Action as ReduxAction, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { Action } from "../player/player";
import { GameState } from "./store";

export enum ActionTypes {
  PLAYER_HIT,
  PLAYER_STAND,
  DEALER_TURN,
  DEALER_HIT,
  NEXT_TURN,
  CHECK_PLAYER,
  CHECK_DEALER,
  RESET,
}

export interface GameAction extends ReduxAction<ActionTypes> {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

export function playerHit(index: number, noDealerTurn?: boolean): ThunkAction<void, GameState, void, GameAction> {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.PLAYER_HIT,
      index,
    });

    if (noDealerTurn) {
      const state = getState();

      if (state.playerTurn < 0
        && (state.dealer.status === Action.hit
          || state.players.some((player) => player.status === Action.hit))) {
        dispatch(dealerTurn());
      }
    }
  };
}

export function playerStand(index: number): ThunkAction<void, GameState, void, GameAction> {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.PLAYER_STAND,
      index,
    });

    const state = getState();

    if (state.playerTurn < 0
      && (state.dealer.status === Action.hit
        || state.players.some((player) => player.status === Action.hit))) {
      dispatch(dealerTurn());
    }
  };
}

export function dealerTurn(): ThunkAction<void, GameState, void, GameAction> {
  return (dispatch, getState) => {
    const state = getState();

    if (state.dealer.status === Action.hit) {
      dispatch({type: ActionTypes.DEALER_TURN});

      if (state.players.every((player) => player.status === Action.stand)) {
        dispatch({type: ActionTypes.DEALER_TURN});
        dispatch(dealerTurn());
      }
    } else {
      dispatch({type: ActionTypes.NEXT_TURN});
    }
  };
}

export const dealerHit: ActionCreator<GameAction> = () => ({type: ActionTypes.DEALER_HIT});

export const checkPlayer: ActionCreator<GameAction> = (index: number) => ({
  type: ActionTypes.CHECK_PLAYER,
  index,
});

export const checkDealer: ActionCreator<GameAction> = () => ({type: ActionTypes.CHECK_DEALER});
export const reset: ActionCreator<GameAction> = () => ({type: ActionTypes.RESET});
